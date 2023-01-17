import Taro from '@tarojs/taro'

export default {
  onLaunch() {
    // 展示本地存储能力
    const logs = Taro.getStorageSync('logs') || []
    logs.unshift(Date.now())
    Taro.setStorageSync('logs', logs)

    // 登录
    Taro.login({
      success: res => {
        console.log(res.code)
      },
    })
  }
}
