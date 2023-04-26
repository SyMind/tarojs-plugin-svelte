import type { SvelteComponentTyped, ComponentConstructorOptions } from 'svelte/internal'
import { installGlobalShims } from './dom'

const { hooks } = require('@tarojs/shared')
const { Current, document } = require('@tarojs/runtime')

installGlobalShims()

const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call('getMiniLifecycleImpl').app

let container: HTMLDivElement = null

export function createSvelteApp(app, config) {
    const pages = new Map()

    const appConfig = {
        config,

        mount(Page: { new(options: ComponentConstructorOptions): SvelteComponentTyped }, id, cb) {
            let options: ComponentConstructorOptions;

            if (process.env.TARO_ENV === 'h5') {
                const root = document.createElement('div')
                root.id = id

                container.appendChild(root)

                options = {
                    target: root,
                    props: {
                        class: 'taro_page'
                    }
                }
            } else {
                const root = document.createElement('root')
                root.id = id
                options = {
                    target: root
                }
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
