function getLoaderMeta() {
    return {
      importFrameworkStatement: '',
      mockAppStatement: '',
      frameworkArgs: 'config',
      creator: 'createSvelteApp',
      creatorLocation: 'tarojs-plugin-svelte/lib/runtime',
      importFrameworkName: '',
      isNeedRawLoader: true
    }
}

module.exports.getLoaderMeta = getLoaderMeta
