const { hooks } = require('@tarojs/shared')

function createSvelteApp(app, h, config) {
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

    return appConfig
}

exports.createSvelteApp = createSvelteApp
