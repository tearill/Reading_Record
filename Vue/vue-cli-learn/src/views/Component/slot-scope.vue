<template>
  <div>
    <h1>编译作用域</h1>
    <cpn v-show="isShow"></cpn>
  </div>
</template>

<script>
import cpn from '../../components/Slot-scope'

export default {
  name: 'slot-scope',
  components: {
    cpn
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {

  }
}
</script>

<style>

</style>