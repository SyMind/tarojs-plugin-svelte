# tarojs-plugin-svelte

使用 Svelte 开发小程序。

> 施工中 🚧。

> 请 Star 🌟 这个项目来表达你的喜爱 ❤️ 和支持。

# 安装与使用

你需要先拥有一个 Taro 项目，如果你还不知该如何创建一个 Taro 项目，请先从这里开始：[Taro 安装及使用](https://docs.taro.zone/docs/GETTING-STARTED)。

### 安装

本项目以 Taro 插件的形式存在，请在你的 Taro 项目中安装**本插件**。

```bash
npm install tarojs-plugin-svelte
```

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
    ]
}
```

# License

[MIT](./LICENSE)
