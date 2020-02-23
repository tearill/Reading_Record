import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import(/* webpackChunkName: "Home" */'@/index/Index.vue')
const Explore = () => import(/* webpackChunkName: "Home" */'@/explore/Index.vue')
const Cart = () => import(/* webpackChunkName: "Home" */'@/cart/Index.vue')
const Me = () => import(/* webpackChunkName: "Home" */'@/me/Index.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/(home|index)?',
      name: 'Home',
      component: Index,
    },
    {
      path: '/index.html',
      name: 'HomeHtml',
      component: Index,
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
    }
  ],
})
