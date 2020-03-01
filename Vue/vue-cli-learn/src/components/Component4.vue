<template>
  <div>
    <h2>我是子组件</h2>
    <button @click="btnClick">子组件的按钮</button>
  </div>
</template>

<script>
export default {
  name: "Component4",
  data() {
    return {
      name: '我是子组件的data'
    }
  },
  methods: {
    btnClick() {
      // $parent 访问父组件  
      console.log(this.$parent.name)
      console.log(this.$root, '+++')
    }
  }
};
</script>

<style>
</style>