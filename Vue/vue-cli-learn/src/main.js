import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 全局过滤器 所有页面都可以使用
// Vue.filter('uppecase', value => {
//   return value.toUpperCase()
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
