const { hooks } = require('@tarojs/shared')
const { Current, document } = require('@tarojs/runtime')

const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call('getMiniLifecycleImpl').app

function createMpApp() {
    const appConfig = {
        config,

        mount(Page, id, cb) {
            const root = document.createElement('root')
            root.id = id

            const options = {
                target: root
            }
            new Page(options)
            cb()
        },

        unmount(id, cb) { },

        updateAppInstance(cb) { },

        [ONLAUNCH](options) { },

        [ONSHOW](options) { },

        [ONHIDE](options) { },

        onError(error) { },

        onUnhandledRejection(error) { },

        onPageNotFound(res) { }
    }

    Current.app = appConfig

    return appConfig
}

function createH5App(app, config) {
    let container = null

    const appConfig = {
        config,

        mount(Page, id, cb) {
            const root = document.createElement('div')
            root.id = id

            container.appendChild(root)

            const options = {
                target: root,
                class: 'taro_page'
            }
            new Page(options)
            cb()
        },

        unmount(id, cb) { },

        updateAppInstance(cb) { },

        [ONLAUNCH](options) {
            const appId = config?.appId || 'app'
            container = document.getElementById(appId)
        },

        [ONSHOW](options) { },

        [ONHIDE](options) { },

        onError(error) { },

        onUnhandledRejection(error) { },

        onPageNotFound(res) { }
    }

    Current.app = appConfig

    return appConfig
}

exports.createSvelteApp = process.env.TARO_ENV === 'h5' ? createH5App : createMpApp
