import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './config/rem'

Vue.config.productionTip = false

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
