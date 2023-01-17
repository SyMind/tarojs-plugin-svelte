<script>
  import { onMount } from 'svelte'
  import Taro from '@tarojs/taro'

  let logs = []

  const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
      [year, month, day].map(formatNumber).join('/') +
      ' ' +
      [hour, minute, second].map(formatNumber).join(':')
    )
  }

  const formatNumber = n => {
    const s = n.toString()
    return s[1] ? s : '0' + s
  }

  onMount(() => {
		  logs = (Taro.getStorageSync('logs') || []).map(log => {
        return {
          date: formatTime(new Date(log)),
          timeStamp: log
        }
      })
	})
</script>

<taro-view class="container log-list">
  {#each logs as log, i (log.timeStamp)}
    <taro-text class="log-item">{i + 1}. {log.date}</taro-text>
  {/each}
</taro-view>

<style>
  .log-list {
    display: flex;
    flex-direction: column;
    padding: 40px;
  }
  .log-item {
    margin: 10px;
  }
</style>
