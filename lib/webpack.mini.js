function modifyMiniWebpackChain (ctx, chain, data, config) {
    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('svelteLoader')
        .loader('svelte-loader')
}

module.exports.modifyMiniWebpackChain = modifyMiniWebpackChain
