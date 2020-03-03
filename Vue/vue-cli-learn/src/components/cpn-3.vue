<template>
  <div>
    <span>This is cpn3</span>
    <br />
    <label>
      选择checkbox，可以触发组件 cpn4 的监听事件
      <input type="checkbox" v-model="isChecked" @change="handleCheckbox" />
    </label>
  </div>
</template>

<script>
import bus from '../config/bus'

export default {
  name: "cpn3",
  data() {
    return {
      isChecked: false
    }
  },
  methods: {
    handleCheckbox() {   
      // 通过 bus 分发 getCheckboxStatus 事件
      bus.$emit('getCheckboxStatus', this.isChecked)
    }
  }
};
</script>

<style>
</style>