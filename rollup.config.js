import * as path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { externals } from 'rollup-plugin-node-externals'
import ts from 'rollup-plugin-ts'

const base = {
  plugins: [
    commonjs(),
    nodeResolve(),
    externals({
      include: [
        '@tarojs/runtime',
        '@tarojs/service',
        '@tarojs/shared',
        '@tarojs/webpack5-runner'
      ]
    }),
    ts()
  ]
}

// 供 CLI 编译时使用的 Taro 插件入口
const compileConfig = {
  input: path.join(__dirname, 'src/index.ts'),
  output: {
    file: path.join(__dirname, 'lib/index.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  },
  ...base
}

// Svelte Loader
const loaderConfig = {
  input: path.join(__dirname, 'src/taroSvelteLoader.ts'),
  output: {
    file: path.join(__dirname, 'lib/taroSvelteLoader.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  },
  ...base
}

// 供 Loader 使用的运行时入口
const runtimeConfig = {
  input: path.join(__dirname, 'src/runtime/index.ts'),
  output: {
    file: path.join(__dirname, 'lib/runtime.js'),
    format: 'es',
    sourcemap: true
  },
  ...base
}

export default [compileConfig, runtimeConfig, loaderConfig]
