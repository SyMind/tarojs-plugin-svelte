<script>
  import Taro from '@tarojs/taro'

  const motto = 'Hello World'

  function handleTap() {
    Taro.navigateTo({
      url: '/pages/logs/logs'
    })
  }
</script>

<t-view class="container">
  <t-view class="userinfo">
    <t-view class="userinfo-avatar" on:tap={handleTap}>
      <t-open-data type="userAvatarUrl"></t-open-data>
    </t-view>
    <t-open-data type="userNickName"></t-open-data>
  </t-view>

  <t-view class="usermotto">
    <t-text class="user-motto">{motto}</t-text>
  </t-view>
</t-view>

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
