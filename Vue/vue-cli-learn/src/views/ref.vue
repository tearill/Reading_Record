<template>
  <div id="ref">
    <h1>ref</h1>
    <label>姓名</label>
    <input type="text" ref="name" @keyup="getName" />
    <span>{{name}}</span>
    
    <label>年龄</label> 
    <input type="text" ref="age" @keyup="getAge" />
    <span>{{age}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      age: 20
    };
  },
  methods: {
    getName() {
      console.log(this.$refs.name.value);
      this.name = this.$refs.name.value;
    },
    getAge() {
      this.age = this.$refs.age.value;
    }
  }
};
</script>

<style>
</style>