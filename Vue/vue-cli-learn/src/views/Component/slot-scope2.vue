<template>
  <div>
    <h1>作用域插槽</h1>
    <cpn>
      <!-- 目的是获取子组件的数据 -->
      <template #default="{data}">
        <!-- <span v-for="(item, index) in slot.data" :key="index">{{item}}</span> -->
        <span>{{data.join(' - ')}}</span>
      </template>
    </cpn>
  </div>
</template>

<script>
import cpn from '../../components/Slot-scope2'
export default {
  name: 'Component-5',
  components: {
    cpn
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
