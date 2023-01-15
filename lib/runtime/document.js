const { document } = require('@tarojs/runtime')
const { isTaro, getTaroComponentName } = require('../utils/names')

const originCreateElement = document.createElement

document.createElement = type => {
    if (isTaro(type)) {
        type = getTaroComponentName(type)
    }
    return originCreateElement(type)
}

module.exports = document
