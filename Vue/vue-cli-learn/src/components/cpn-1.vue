<template>
  <div>
    <span>This is cpn1</span>
    <br />
    <input type="text" v-model="myMessage" @input="passData(myMessage)">
    <!-- cpn2 组件中能直接触发 getCData 的原因在于：cpn1 组件调用 cpn2 组件时，使用 v-on 绑定了 $listeners 属性 -->
    <!-- 通过 v-bind 绑定 $attrs 属性，cpn2 组件可以直接获取到父组件中传递下来的 props（除了 cpn1 组件中 props 声明的） -->
    <cpn2 v-bind="$attrs" v-on="$listeners"></cpn2>
  </div>
</template>

<script>
import cpn2 from './cpn-2'

export default {
  name: 'cpn1',
  components: {
    cpn2
  },
  props: ['message'],
  data() {
    return {
      myMessage: this.message
    }
  },
  methods: {
    passData() { // 传值给父组件的 getChildData 接收
      this.$emit('getChildData', this.myMessage)
      console.log(this.myMessage, '+++++')
    }
  }
}
</script>

<style>

</style>