const { modifyMiniWebpackChain } = require('./webpack.mini')

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

module.exports = ctx => {
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

        modifyMiniWebpackChain(ctx, chain)
    })

    ctx.modifyRunnerOpts(({ opts }) => {
        if (!opts.compiler) {
            return
        }

        opts.frameworkExts = '.svelte'
    })
}
