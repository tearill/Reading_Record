<template>
  <div id="ref">
    <h1>ref</h1>
    <label>姓名</label>
    <input type="text" ref="name" @keyup="getName" />
    <span>{{name}}</span>

    <label>年龄</label> 
    <input type="text" ref="age" @keyup="getAge" />
    <span>{{age}}</span>

    <Cpn ref="component" :name="componentName" />
  </div>
</template>

<script>
import Cpn from '../components/cpn-5'
export default {
  data() {
    return {
      name: '',
      age: 20,
      componentName: ''
    };
  },
  components: {
    Cpn
  },
  mounted() {
    this.componentName = 'Cpn5'
    console.log('Father Component Mounted')
    this.$nextTick(() => {
      this.$refs.component.showName()
    })
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