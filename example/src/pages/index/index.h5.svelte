<script>
  import Taro from '@tarojs/taro'

  const motto = 'Hello World'

  function handleTap() {
    Taro.navigateTo({
      url: '/pages/logs/logs'
    })
  }
</script>

<taro-view class="container">
  <taro-view class="userinfo">
    <taro-view class="userinfo-avatar" on:tap={handleTap}>
      <taro-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </taro-view>
  </taro-view>

  <taro-view class="usermotto">
    <taro-text class="user-motto">{motto}</taro-text>
  </taro-view>
</taro-view>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200px 0;
    box-sizing: border-box;
  }
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #aaa;
  }

  .userinfo-avatar {
    overflow: hidden;
    width: 128px;
    height: 128px;
    margin: 20px;
    border-radius: 50%;
  }

  .usermotto {
    margin-top: 200px;
  }
</style>
