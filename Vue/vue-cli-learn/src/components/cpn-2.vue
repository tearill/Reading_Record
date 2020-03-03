<template>
  <div>
    <span>This is cpn2</span>
    <br />
    <input type="text" v-model="myMessagec" @input="passData">
  </div>
</template>

<script>
export default {
  name: 'cpn2',
  data() {  
    return {
      myMessagec: this.$attrs.messagec,
      test: this.$attrs.test
    }
  },
  methods: {
    passData() {
      this.$emit('getCData', this.myMessagec)
      this.$emit('getTest', this.test)
    }
  }
}
</script>

<style>

</style>