function isTaro(name) {
    return name.startsWith('taro-')
}

function getTaroComponentName(name) {
    return name.substring(5)
}

module.exports = {
    isTaro,
    getTaroComponentName
}
