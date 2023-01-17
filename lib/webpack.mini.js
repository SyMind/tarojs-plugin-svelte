const { getLoaderMeta } = require('./loader-meta')

function modifyMiniWebpackChain(chain) {
    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('taroSvelteLoader')
        .loader(require.resolve('./taroSvelteLoader'))
        .options({
            emitCss: true,
            compilerOptions: {
                hydratable: true
            }
        })

    chain.plugin('miniPlugin')
        .tap(args => {
            args[0].loaderMeta = getLoaderMeta()
            return args
        })
}

exports.modifyMiniWebpackChain = modifyMiniWebpackChain
