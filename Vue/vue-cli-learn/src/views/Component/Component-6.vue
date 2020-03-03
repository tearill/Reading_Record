<template>
  <div>
    <h1>兄弟组件传值</h1>
    下面是两个兄弟组件:
    <br />
    <br />
    <cpn3></cpn3>
    <cpn4></cpn4>
  </div>
</template>

<script>
import cpn3 from '../../components/cpn-3'
import cpn4 from '../../components/cpn-4'
export default {
  name: 'Component6',
  components: {
    cpn3,
    cpn4
  },
  data() {
    return {
      muMessage: 'Hello brother component'
    }
  }
}
</script>

<style>

</style>