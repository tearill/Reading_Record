import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/index/Index.vue'
// 延迟加载提高性能
const Apply = () => import('@/apply/Index.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/(home|index)?',
    name: 'Index',
    component: Index,
  }, {
    path: '/apply',
    name: 'Apply',
    component: Apply,
  }],
})
