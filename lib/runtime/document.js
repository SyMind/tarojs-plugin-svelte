const { document } = require('@tarojs/runtime')

module.exports = Object.assign({}, document, {
    createElement(type) {
        if (type.startsWith('taro-')) {
            type = type.substring(5)
        }
        return document.createElement(type)
    }
})
