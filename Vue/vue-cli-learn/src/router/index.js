import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    component: () => import('../views/Demo1.vue')
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../views/Calculator.vue')
  },
  {
    path: '/demo2',
    name: 'Demo2',
    component: () => import('../views/Demo2.vue')
  },
  {
    path: '/brandDemo',
    name: 'brandDemo',
    component: () => import('../views/brandDemo.vue')
  },
  {
    path: '/filter',
    name: 'filter',
    component: () => import('../views/filter.vue')
  },
  {
    path: '/directive',
    name: 'directive',
    component: () => import('../views/directive.vue')
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    component: () => import('../views/LifeCycle.vue')
  },
  {
    path: '/computed-watch',
    name: 'computed_watch',
    component: () => import('../views/computed-watch.vue')
  },
  {
    path: '/ref',
    name: 'ref',
    component: () => import('../views/ref.vue')
  },
  {
    path: '/component-1',
    name: 'component_1',
    component: () => import('../views/Component/Component-1.vue')
  },
  {
    path: '/component-2',
    name: 'component_2',
    component: () => import('../views/Component/Component-2.vue')
  },
  {
    path: '/component-3',
    name: 'component_3',
    component: () => import('../views/Component/Component-3.vue')
  },
  {
    path: '/component-4',
    name: 'component_4',
    component: () => import('../views/Component/Component-4.vue')
  },
  {
    path: '/slot-scope',
    name: 'slot_scope',
    component: () => import('../views/Component/slot-scope.vue')
  },
  {
    path: '/slot-scope2',
    name: 'slot_scope2',
    component: () => import('../views/Component/slot-scope2.vue')
  },
  {
    path: '/attars-listeners',
    name: 'attars_listeners',
    component: () => import('../views/Component/Component-5.vue')
  },
  {
    path: '/brother-component',
    name: 'brother_component',
    component: () => import('../views/Component/Component-6.vue')
  },
  {
    path: '/router/:id(\\d+)?/:type?',
    name: 'Router',
    meta: {
      title: 'Router'
    },
    component: () => import('../views/Router.vue'),
    children: [
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
      }
    ],
    beforeEnter(to, from, next) {
      console.log('beforeEnter: 即将进入Router')
      next()
    }
  },
  { 
    path: '*',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 全局的路由钩子函数
router.beforeEach((to, from, next) => {
  console.log(`beforeEach: 即将进入${to.path}页面`)
  // to 目标路由 
  // from 前一个路由
  // next 必须执行next 方法，才能跳转路由
  //   执行next()，跳转 to 对应的路由
  //   执行next(false)，不跳转
  //   执行next(xxx)，跳转到 xxx 页面
  if (to.name === 'Calculator') {
    next('demo1')
  } else {
    next()
  }
  // next()
})

// 路由跳转后的钩子函数
router.afterEach((to, from) => {
  console.log(`afterEach: 进入了${to.path}页面`)
})

export default router
