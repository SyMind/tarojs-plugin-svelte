import * as path from 'path'
import { externals } from 'rollup-plugin-node-externals'
import ts from 'rollup-plugin-ts'

const base = {
  plugins: [
    externals({
      deps: true,
      devDeps: false,
    }),
    ts()
  ]
}

// 供 CLI 编译时使用的 Taro 插件入口
const compileConfig = {
  input: path.join(__dirname, 'src/index.js'),
  output: {
    file: path.join(__dirname, 'lib/index.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  },
  ...base
}

// 供 Loader 使用的运行时入口
const runtimeConfig = {
  input: path.join(__dirname, 'src/runtime/index.js'),
  output: {
    file: path.join(__dirname, 'lib/runtime.js'),
    format: 'es',
    sourcemap: true
  },
  ...base
}

export default [compileConfig, runtimeConfig]
