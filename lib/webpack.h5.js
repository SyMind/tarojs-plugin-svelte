const { getLoaderMeta } = require('./loader-meta')

function modifyH5WebpackChain(chain) {
    const alias = chain.resolve.alias
    alias.set('@tarojs/components$', 'tarojs-plugin-svelte/lib/components')

    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('taroSvelteLoader')
        .loader(require.resolve('./taroSvelteLoader'))

    chain.plugin('mainPlugin')
        .tap(args => {
            args[0].loaderMeta = getLoaderMeta()
            return args
        })
}
  
exports.modifyH5WebpackChain = modifyH5WebpackChain
  