interface ILoaderMeta {
  importFrameworkStatement: string
  mockAppStatement: string
  frameworkArgs: string
  creator: string
  creatorLocation: string
  extraImportForWeb: string
  execBeforeCreateWebApp: string
  importFrameworkName: string
  isNeedRawLoader?: boolean
  modifyConfig?: (config: Record<string, any>, source: string) => void
}

export function getLoaderMeta(): ILoaderMeta {
    return {
      importFrameworkStatement: '',
      mockAppStatement: '',
      frameworkArgs: 'config',
      creator: 'createSvelteApp',
      creatorLocation: 'tarojs-plugin-svelte/lib/runtime',
      importFrameworkName: '',
      isNeedRawLoader: true,
      extraImportForWeb: '',
      execBeforeCreateWebApp: ''
    }
}
