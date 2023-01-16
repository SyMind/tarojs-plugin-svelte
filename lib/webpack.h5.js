const { getLoaderMeta } = require('./loader-meta')

function modifyH5WebpackChain(ctx, chain) {
    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('svelteLoader')
        .loader(require.resolve('./svelteLoader'))

    chain.plugin('mainPlugin')
        .tap(args => {
            args[0].loaderMeta = getLoaderMeta()
            return args
        })
}
  
exports.modifyH5WebpackChain = modifyH5WebpackChain
  