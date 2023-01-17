const { hooks } = require('@tarojs/shared')
const { Current, document } = require('@tarojs/runtime')

const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call('getMiniLifecycleImpl').app

function createSvelteApp(app, config) {
    const pages = new Map()

    const appConfig = {
        config,

        mount(Page, id, cb) {
            const options = {}

            if (process.env.TARO_ENV === 'h5') {
                const root = document.createElement('div')
                root.id = id

                container.appendChild(root)

                options.target = root
                options.class = 'taro_page'
            } else {
                const root = document.createElement('root')
                root.id = id
                options.target = root
            }

            const page = new Page(options)
            pages.set(id, page)
            cb()
        },

        unmount(id, cb) {
            if (pages.has(id)) {
                pages.get(id).$destroy()
            }
            cb()
        },

        updateAppInstance(cb) { },

        [ONLAUNCH](options) {
            if (process.env.TARO_ENV === 'h5') {
                const appId = config?.appId || 'app'
                container = document.getElementById(appId)
            }

            app?.onLaunch?.(options)
        },

        [ONSHOW](options) {
            app?.onShow?.(options)
        },

        [ONHIDE](options) {
            app?.onHide?.(options)
        },

        onError(error) {
            app?.onError?.(error)
        },

        onUnhandledRejection(error) {
            app?.onUnhandledRejection?.(error)
        },

        onPageNotFound(res) {
            app?.onPageNotFound?.(res)
        }
    }

    Current.app = appConfig

    return appConfig
}

exports.createSvelteApp = createSvelteApp
