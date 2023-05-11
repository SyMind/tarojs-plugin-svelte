import sveltePreprocess from 'svelte-preprocess'
import { getLoaderMeta } from './loader-meta'

export function modifyH5WebpackChain(chain) {
    const alias = chain.resolve.alias
    alias.set('@tarojs/components$', 'tarojs-plugin-svelte/lib/components')

    chain.module
        .rule('svelte')
        .test(/\.svelte$/i)
        .use('taroSvelteLoader')
        .loader(require.resolve('./taroSvelteLoader'))
        .options({
            emitCss: true,
            preprocess: sveltePreprocess({
                typescript: {
                    compilerOptions: {
                        module: 'ESNext',
                    }
                }
            })
        })

    chain.plugin('mainPlugin')
        .tap(args => {
            args[0].loaderMeta = getLoaderMeta()
            return args
        })
}
  