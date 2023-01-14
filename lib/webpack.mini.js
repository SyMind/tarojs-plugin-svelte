const { getLoaderMeta } = require('./loader-meta')

function modifyMiniWebpackChain (ctx, chain) {
    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('svelteLoader')
        .loader('svelte-loader')

    chain.plugin('miniPlugin')
        .tap(args => {
            args[0].loaderMeta = getLoaderMeta()
            return args
        })
}

module.exports.modifyMiniWebpackChain = modifyMiniWebpackChain
