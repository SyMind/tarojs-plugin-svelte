const { relative, basename, extname, dirname, join } = require('path');
const { getOptions } = require('loader-utils');
const { compile, preprocess, walk } = require('svelte/compiler');
const { componentConfig } = require('@tarojs/webpack5-runner/dist/template/component')
const { isTaro, getTaroComponentName } = require('../utils/names')
const { buildMakeHot } = require('./make-hot');

function posixify(file) {
	return file.replace(/[/\\]/g, '/');
}

const virtualModules = new Map();

module.exports = function (source) {
	this.cacheable();

	const options = { ...getOptions(this) };
	const callback = this.async();

	if (options.cssPath) {
		const css = virtualModules.get(options.cssPath);
		virtualModules.delete(options.cssPath);
		callback(null, css);
		return;
	}

	const isServer = this.target === 'node' || (options.compilerOptions && options.compilerOptions.generate == 'ssr');
	const isProduction = this.minimize || process.env.NODE_ENV === 'production';

	const compileOptions = {
		filename: this.resourcePath,
		css: true,
		...options.compilerOptions,
		format: (options.compilerOptions && options.compilerOptions.format) || 'esm'
	};

	const handleWarning = warning => this.emitWarning(new Error(warning));

	options.preprocess = options.preprocess || {};
	options.preprocess.filename = compileOptions.filename;

	preprocess(source, options.preprocess).then(processed => {
		if (processed.dependencies && this.addDependency) {
			for (let dependency of processed.dependencies) {
				this.addDependency(dependency);
			}
		}

		if (processed.map) compileOptions.sourcemap = processed.map;

		const compiled = compile(processed.toString(), compileOptions);
		let { js, css, warnings, ast } = compiled;

		// 收集 Taro 组件
		walk(ast.html, {
			enter(node) {
				if (node.type === 'Element' && isTaro(node.name)) {
					const name = getTaroComponentName(node.name)
					componentConfig.includes.add(name)
				}
			}
		})

		if (!js.map.sourcesContent) {
			js.map.sourcesContent = [source];
			js.map.sources = [compileOptions.filename];
		}

		warnings.forEach(
			options.onwarn
				? warning => options.onwarn(warning, handleWarning)
				: handleWarning
		);

		if (options.hotReload && !isProduction && !isServer) {
			const hotOptions = { ...options.hotOptions };
			const makeHot = buildMakeHot(hotOptions);
			const id = JSON.stringify(relative(process.cwd(), compileOptions.filename));
			js.code = makeHot(id, js.code, hotOptions, compiled, source, compileOptions);
		}

		if (css.code) {
			const resource = posixify(compileOptions.filename);
			const cssPath = join(dirname(resource), `${basename(resource, extname(resource))}.css`);
			css.code += '\n/*# sourceMappingURL=' + css.map.toUrl() + '*/';
			js.code += `\nimport '${cssPath}!=!${__dirname}?cssPath=${cssPath}!${resource}'\n;`;
			virtualModules.set(cssPath, css.code);
		}

		callback(null, js.code, js.map);
	}, err => {
		const file = err.file || err.filename;
		if (typeof file === 'string' && file !== this.resourcePath) {
			this.addDependency(file);
		}
		callback(err);
	}).catch(err => {
		// wrap error to provide correct
		// context when logging to console
		callback(new Error(`${err.name}: ${err.toString()}`));
	});
};
