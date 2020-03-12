<template>
  <div>
    <h1>路由 vue-router</h1>
    <div>{{ $route.fullPath }}</div>
    <div>
      <!-- js 切换路由 -->
      <button @click="switchRouter('demo1')">JS 方式切换路由</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Router',
  mounted() {
    console.log(this.$route)
  },
  data() {
    return {
      text: '123'
    }
  },
  methods: {
    switchRouter(router) {
      console.log(this.$router)
      // this.$router.push(router)
      // this.$router.go(-1)
      this.$router.push({
        path: 'router/123/open'
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter: 即将进入Router')
    // next()
    // console.log(this.text) //! 报错，这个时候获取不到组件实例，读取不到 this
    next(vm => { // 通过传回调函数给 next 来访问组件实例，在导航被确认的时候执行，并把组件实例作为回调的参数
      console.log(vm.text)
    })
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate: 即将更新Router')
    console.log(this.text, '---beforeRouteUpdate:text') // 可以读取组件实例
    next()
  },
  beforeRouteLeave(to, from , next) {
    console.log('beforeRouteLeave: 即将离开Router')
    // next(false)
    next()
  }
}
</script>

<style>

</style>