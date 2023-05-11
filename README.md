<h1 align="center">Taro Plugin Svelte</h1>

<p align="center">使用 Svelte 开发小程序。</p>

<img alt="" src="https://github.com/SyMind/tarojs-plugin-svelte/blob/main/screenshots/weapp.png">

> 请 Star 🌟 这个项目来表达你的喜爱 ❤️ 和支持。

# 示例项目

[使用 Svelte 开发的网易云音乐小程序](https://github.com/SyMind/netease-cloud-music)

# 安装与使用

你需要先拥有一个 Taro 项目，如果你还不知该如何创建一个 Taro 项目，请先从这里开始：[Taro 安装及使用](https://docs.taro.zone/docs/GETTING-STARTED)。

### 安装

本项目以 Taro 插件的形式存在，请在你的 Taro 项目中安装**本插件**。

```bash
yarn add tarojs-plugin-svelte
```

### 配置

在 Taro 项目的 `config/index.js` 中添加本插件，并将 `framework` 更改为 `svelte`。

```javascript
const config = {
    framework: 'svelte',
    plugins: [
        'tarojs-plugin-svelte'
    ],
}
```

# 和使用 React 的对比

> 比较方法的细节在这里 [svelte-react-analysis](https://github.com/SyMind/svelte-react-analysis) 。

## 打包体积

|        | 初始项目   |
| ------ | ---------- |
| Svelte | 169kb ⭐️ |
| React  | 307kb      |
| PReact | 193kb      |

# License

[MIT](./LICENSE)
