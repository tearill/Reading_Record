<template>
  <div>
    <h1>隔代组件通信</h1>
    <p>This is parent component</p>
    <cpn1 :messagec="messagec" :test="'testMsg'" :message="message" @getCData="getCData" @getChildData="getChildData" @getTest="getTest"></cpn1>
  </div>
</template>

<script>
import cpn1 from '../../components/cpn-1'

export default {
  name: 'Component-5',
  components: {
    cpn1
  },
  data() {
    return {
      message: 'Hello cpn1', // 传递给子组件 cpn1 的信息
      messagec: 'Hello cpn2' // 传递给隔代组件 cpn2 的信息
    }
  },
  methods: {
    getChildData(val) { // 获取子组件的信息
      console.log(val, '+msg from cpn1')
    },
    getCData(val) { // 获取隔代组件的信息
      console.log(val, '+msg from cpn2')
    },
    getTest(val) {
      console.log('-----------', val)
    }
  }
}
</script>

<style>

</style>