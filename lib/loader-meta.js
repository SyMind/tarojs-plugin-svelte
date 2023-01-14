function getLoaderMeta() {
    return {
      importFrameworkStatement: '',
      mockAppStatement: '',
      frameworkArgs: 'config',
      creator: 'createSvelteApp',
      creatorLocation: 'taro-plugin-svelte/lib/runtime',
      importFrameworkName: 'h',
      isNeedRawLoader: true
    }
}

module.exports.getLoaderMeta = getLoaderMeta
