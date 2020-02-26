<template>
  <div id="app">
    <h3 id="h3">{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "ok"
    };
  },
  methods: {
    show() {
      console.log("执行了show方法");
    }
  },
  beforeCreate() {
    console.log(this.msg); // undefined
  },
  created() {
    // 遇到的第二生命周期函数 --- data 和 methods 都已经被初始化好了
    console.log(this.msg);
    this.show();
  },
  beforeMount() {
    // 模板已经在内存中编译完成
    // console.log(document.getElementById('h3').innerText);
  },
  
};
</script>

<style>
</style>