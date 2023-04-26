function installGlobalShims() {
    let originCreateEvent = document.createEvent
    document.createEvent = function (type, node) {
        const e = originCreateEvent(type, node)
        e.initCustomEvent = (type, ignored1, ignored2, detail) => {
            e.type = type
            e.detail = detail
            e.eventName = type
        }
        return e
    }
}

exports.installGlobalShims = installGlobalShims
