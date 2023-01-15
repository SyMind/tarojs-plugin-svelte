const { document } = require('@tarojs/runtime')

const originCreateElement = document.createElement

document.createElement = type => {
    if (type.startsWith('taro-')) {
        type = type.substring(5)
    }
    return originCreateElement(type)
}

module.exports = document
