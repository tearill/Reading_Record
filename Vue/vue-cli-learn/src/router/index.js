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
import watch_router from '../views/watch-router.vue'
import test1 from '../components/test1.vue'
import test2 from '../components/test2.vue'

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
    path: '/watch-router',
    name: 'watch_router',
    component: watch_router
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
