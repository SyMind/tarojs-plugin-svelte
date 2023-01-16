<script>
  let count = 0;

  function handleTap() {
    count += 1;
  }
</script>

<taro-button class="btn" on:tap={handleTap}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</taro-button>

<style>
.btn {
  background-color: red;
}
</style>
