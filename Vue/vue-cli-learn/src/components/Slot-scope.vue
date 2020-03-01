<template>
  <div>
    <h2>我是子组件</h2>
    <p>我是子组件内容</p>
    <button v-show="isShow"></button>
  </div>
</template>

<script>
export default {
  name: 'Slot-scope',
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style>

</style>