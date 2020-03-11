import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store, // 整个应用的财务
  render: h => h(App)
}).$mount('#app')
