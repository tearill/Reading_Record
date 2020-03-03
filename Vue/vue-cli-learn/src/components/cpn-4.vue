<template>
  <div>
    <span>This is cpn4</span>
    <br />
    <p>这是组件 cpn3 中 isChecked 的值：{{isChecked}}</p>
  </div>
</template>

<script>
import bus from '../config/bus'

export default {
  name: 'cpn4',
  data() {
    return {
      isChecked: false
    }
  },
  mounted() {
    this.getCheckboxStatus()
  },
  methods: {
    getCheckboxStatus() {
      // 通过 bus 监听 getCheckboxStatus 事件
      bus.$on('getCheckboxStatus', data => {
        this.isChecked = data
      })
    }
  }
}
</script>

<style>

</style>