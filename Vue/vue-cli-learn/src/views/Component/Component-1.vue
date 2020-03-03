<template>
  <div>
    <h1>组件学习</h1>

    <!-- <my-component></my-component> -->
    <!-- <my-component text="组件传参"></my-component> -->
    <hr />
    <my-component :text="msg" :num="20" :obj="obj" :list="list" :bool="bool"></my-component>
  </div>
</template>

<script>
import MyComponent from "../../components/Component1";
export default {
  components: {
    MyComponent
  },
  data() {
    return {
      msg: "动态参数",
      obj: {
        a: 1,
        b: 2
      },
      list: [1, 2, 3, 4, 5],
      bool: false
    };
  }
};
</script>

<style>
</style>