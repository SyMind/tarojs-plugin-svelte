import { modifyH5WebpackChain } from './webpack.h5'
import { modifyMiniWebpackChain } from './webpack.mini'

try {
    const configSchema = require('@tarojs/cli/dist/doctor/configSchema')
    const Joi = require('joi')

    configSchema.default.$_terms.keys.forEach(term => {
        if (term.key === 'framework') {
            term.schema = Joi.any().valid('nerv', 'react', 'preact', 'vue', 'vue3', 'svelte').required()
        }
    })
} catch {
    // ignore
}

export default ctx => {
    const { framework } = ctx.initialConfig
    if (framework !== 'svelte') {
        return
    }

    ctx.modifyWebpackChain(({ chain }) => {
        chain
            .plugin('definePlugin')
            .tap(args => {
                const config = args[0]
                config.__TARO_FRAMEWORK__ = `"${framework}"`
                return args
            })

        chain.resolve.extensions.add('.svelte')

        if (process.env.TARO_ENV === 'h5') {
            modifyH5WebpackChain(chain)
        } else {
            modifyMiniWebpackChain(chain)
        }
    })

    ctx.modifyRunnerOpts(({ opts }) => {
        if (!opts.compiler) {
            return
        }

        opts.frameworkExts = '.svelte'

        if (typeof opts.compiler === 'string') {
          opts.compiler = {
            type: opts.compiler
          }
        }

        const { compiler } = opts

        if (compiler.type === 'webpack5') {
            if (!compiler.prebundle) {
                compiler.prebundle = {}
            }
            const prebundleOptions = compiler.prebundle
            if (!prebundleOptions.include) {
                prebundleOptions.include = []
            }
            if (!prebundleOptions.exclude) {
                prebundleOptions.exclude = []
            }

            // TODO：暂时关闭 prebundle
            prebundleOptions.enable = false
            if (prebundleOptions.enable === false) {
                return
            }

            if (!prebundleOptions.esbuild) {
                prebundleOptions.esbuild = {}
            }
            const esbuildConfig = prebundleOptions.esbuild
            if (!prebundleOptions.plugins) {
                prebundleOptions.plugins = []
            }
        }
    })
}
