const { hooks } = require('@tarojs/shared')
const { Current } = require('@tarojs/runtime')

function createSvelteApp(app, config) {
    const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call('getMiniLifecycleImpl').app

    const appConfig = {
        config,

        mount(component) {
            
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

exports.createSvelteApp = createSvelteApp
