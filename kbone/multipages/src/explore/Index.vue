<template>
  <div class="cnt">
    <div class="contains">
        test
    </div>
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '../common/tabBar.vue'
export default {
    name: 'Explore',
    components: {
        tabBar
    }
}
</script>

<style lang="less">
@import '../index/style.less';
</style>