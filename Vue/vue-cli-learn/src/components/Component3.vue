<template>
  <div>我是子组件</div>
</template>

<script>
export default {
  name: "Component3",
  data() {
    return {
      name: '我是子组件的data'
    }
  },
  methods: {
    showMsg() {
      console.log("showMsg");
    }
  }
};
</script>

<style>
</style>