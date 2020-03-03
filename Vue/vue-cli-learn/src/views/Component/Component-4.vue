<template>
  <div>
    <h1>父组件访问子组件</h1>
    <my-component1 ref='cpn3'></my-component1>
    <button @click="btnClick">打印子组件信息</button>

    <hr>
    <my-component2></my-component2>
  </div>
</template>

<script>
import myComponent1 from "../../components/Component3";
import myComponent2 from "../../components/Component4";

export default {
  name: "Component-4",
  components: {
    myComponent1,
    myComponent2
  },
  data() {
    return {
      name: '我是父组件的data'
    }
  },
  methods: {
    btnClick() {
      console.log(this.$children)
      this.$children[0].showMsg()
      console.log(this.$children[0].name)
      console.log('--------------------')
      console.log(this.$refs.cpn3.name)
    }
  }
};
</script>

<style>
</style>