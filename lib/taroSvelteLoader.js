const svelteLoader = require('svelte-loader')

let componentConfig
try {
	componentConfig = require('@tarojs/webpack5-runner/dist/template/component').componentConfig
} catch {
	// 兼容 Taro 3.6.5 版本
	componentConfig = require('@tarojs/webpack5-runner/dist/utils/component').componentConfig
}

if (!componentConfig) {
	throw new Error('The plugin does not support the current version of Taro')
}

function transformNode(code) {
	return Promise.all([import ('code-red'), import('estree-walker')]).then(([codeRed, walker]) => {
		const program = codeRed.parse(code, {
			sourceType: 'module',
			ecmaVersion: 12,
			locations: true
		})

		let element, listen
		walker.walk(program, {
			enter(node) {
				if (node.type === 'ImportDeclaration' && node.source.type === 'Literal' && node.source.value === 'svelte/internal') {
					for (const specifier  of node.specifiers) {
						if (specifier.type === 'ImportSpecifier') {
							if (specifier.imported.name === 'element') {
								element = specifier.local.name
							}
							if (specifier.imported.name === 'listen') {
								listen = specifier.local.name
							}
						}
					}
				}

				if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
					if (node.callee.name === element) {
						const arg = node.arguments[0]
						const prefix = 't-'
						if (arg.type === 'Literal' && arg.value.startsWith(prefix)) {
							if (process.env.TARO_ENV === 'h5') {
								arg.value = arg.value + '-core'
							} else {
								arg.value = arg.value.substring(prefix.length)

								// 收集小程序模板中需要渲染的组件
								componentConfig.includes.add(arg.value)
							}
							arg.raw = JSON.stringify(arg.value)
						}
					}
					if (node.callee.name === listen){
						const arg = node.arguments[1]
						if (arg.type === 'Literal' && arg.value === 'tap') {
							if (process.env.TARO_ENV === 'h5') {
								arg.value = 'click'
								arg.raw = JSON.stringify(arg.value)
							}
						}
					}
				}
			}
		})
		if (element || listen) {
			code = codeRed.print(program).code
		}

		return code
	})
}

module.exports = function (source) {
	const originAsync = this.async

	this.async = () => {
		const callback = originAsync.call(this)
		return (err, code, map) => {
			if (err) {
				callback(err)
			} else {
				transformNode(code).then(res => {
					callback(null, res, map)
				})
			}
		}
	}

	svelteLoader.call(this, source)
}
