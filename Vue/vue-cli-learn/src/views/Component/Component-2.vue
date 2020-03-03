<template>
  <div>
    <h1>子组件与父组件通信</h1>

    <my-component :text="content" @on-callback="getData"></my-component>
    <div>{{content}}</div>

    <hr />

    <my-component v-model="content"></my-component>
    <div>{{content}}</div>
  </div>
</template>

<script>
import MyComponent from "../../components/Component2.vue";
export default {
  data() {
    return {
      content: "hello"
    };
  },
  components: {
    MyComponent
  },
  methods: {
    getData(val) {
      // console.log(val);
      this.content = val;
    }
  }
};
</script>

<style>
</style>