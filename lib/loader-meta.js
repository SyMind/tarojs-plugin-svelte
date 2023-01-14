function getLoaderMeta() {
    return {
      importFrameworkStatement: '',
      mockAppStatement: '',
      frameworkArgs: 'h, config',
      creator: 'createSvelteApp',
      creatorLocation: 'taro-plugin-svelte/src/runtime',
      importFrameworkName: 'h',
      isNeedRawLoader: true
    }
}

module.exports.getLoaderMeta = getLoaderMeta
