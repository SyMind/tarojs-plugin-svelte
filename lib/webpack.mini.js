const { componentConfig } = require('@tarojs/webpack5-runner/dist/template/component')
const { isTaro, getTaroComponentName } = require('./utils/names')
const { getLoaderMeta } = require('./loader-meta')

function modifyMiniWebpackChain(ctx, chain) {
    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('svelteLoader')
        .loader('svelte-loader')
        .options({
            preprocess: {
                markup({ content }) {
                    const ast = parse(content)
                    walk(ast.html, {
                        enter(node) {
                            if (node.type === 'Element' && isTaro(node.name)) {
                                const name = getTaroComponentName(node.name)
                                componentConfig.includes.add(name)
                            }
                        }
                    })
                }
            }
        })

    chain.plugin('miniPlugin')
        .tap(args => {
            args[0].loaderMeta = getLoaderMeta()
            return args
        })

    chain.plugin('providerPlugin')
        .tap(args => {
            args[0].document = ['tarojs-plugin-svelte/lib/runtime/document.js']
            return args
        })
}

module.exports.modifyMiniWebpackChain = modifyMiniWebpackChain
