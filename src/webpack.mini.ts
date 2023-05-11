import sveltePreprocess from 'svelte-preprocess'
import { getLoaderMeta } from './loader-meta'

export function modifyMiniWebpackChain(chain) {
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

    chain.plugin('miniPlugin')
        .tap(args => {
            args[0].loaderMeta = getLoaderMeta()
            return args
        })
}
