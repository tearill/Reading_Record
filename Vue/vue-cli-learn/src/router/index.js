import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Demo1 from '../views/Demo1.vue'
import Calculator from '../views/Calculator.vue'
import Demo2 from '../views/Demo2.vue'
import brandDemo from '../views/brandDemo.vue'
import filter from '../views/filter.vue'
import directive from '../views/directive.vue'
import lifecycle from '../views/LifeCycle.vue'
import computed_watch from '../views/computed-watch.vue'
import ref from '../views/ref.vue'
import component_1 from '../views/Component-1.vue'
import component_2 from '../views/Component-2.vue'
import component_3 from '../views/Component-3.vue'
import component_4 from '../views/Component-4.vue'
import slot_scope from '../views/slot-scope.vue'
import slot_scope2 from '../views/slot-scope2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo1',
    name: 'Demo1',
    component: Demo1
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/demo2',
    name: 'Demo2',
    component: Demo2
  },
  {
    path: '/brandDemo',
    name: 'brandDemo',
    component: brandDemo
  },
  {
    path: '/filter',
    name: 'filter',
    component: filter
  },
  {
    path: '/directive',
    name: 'directive',
    component: directive
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    component: lifecycle
  },
  {
    path: '/computed-watch',
    name: 'computed_watch',
    component: computed_watch
  },
  {
    path: '/ref',
    name: 'ref',
    component: ref
  },
  {
    path: '/component-1',
    name: 'component_1',
    component: component_1
  },
  {
    path: '/component-2',
    name: 'component_2',
    component: component_2
  },
  {
    path: '/component-3',
    name: 'component_3',
    component: component_3
  },
  {
    path: '/component-4',
    name: 'component_4',
    component: component_4
  },
  {
    path: '/slot-scope',
    name: 'slot_scope',
    component: slot_scope
  },
  {
    path: '/slot-scope2',
    name: 'slot_scope2',
    component: slot_scope2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
