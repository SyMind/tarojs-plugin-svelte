const { getLoaderMeta } = require('./loader-meta')

function modifyMiniWebpackChain(chain) {
    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('svelteLoader')
        .loader(require.resolve('./svelteLoader'))

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

exports.modifyMiniWebpackChain = modifyMiniWebpackChain
