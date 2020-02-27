<template>
  <div>
    <input type="text" v-model="val">
    <button @click="submit">提交给父组件</button>
  </div>
</template>

<script>
export default {
  name: "Component2",
  props: ['text', 'msg'],
  model: {
    prop: 'msg',
    event: 'on-callback'
  },
  data() {
    return {
      val: this.msg
    }
  },
  methods: {
    submit() {
      // val
      this.$emit('on-callback', this.val)
    },
  }
}
</script>

<style>

</style>