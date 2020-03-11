# vuex-shop-cart

- 前端 后端  
  全栈 js + node  

- vuex  
  vue + vue-router | + vuex  
  大型项目可能会用到 vuex  
  vuex 不是必需品  
  数据流管理  
  确定了一定要使用 vuex 之后再使用(会有一定的开销)  

- 举例：  
  以电商网站为例：  
  物流独立开  
  武汉仓库、南昌仓库  

  vue 页面相当于开的店 --- 前台  
  vuex --- 仓库  

  api/shop.js --- 总仓库  
  store --- 离自己最近的仓库  
  通过 api 取数据，把数据流到最近的仓库中  

1. 切页面  
2. 走接口，数据流  

- vuex 就像是财务  
  原来是 api(老板) -> 页面(员工)  
  现在是 api(老板) -> vuex(财务) -> 页面(员工)  

  大项目中数据比较复杂，如果所有的数据由 api 来分发数据流可能会出问题  
  vuex 作为一个中间层来分发数据，并且同时把数据的进、出操作都记录下来，可以追溯  

- store/index.js  
  ```js
  import Vue from 'vue'
  import Vuex from 'vuex' // 请财务来

  import Api from '@/api/shop.js' // 数据接口

  export default new Vuex.store({
    state: {}, // vuex 中的数据部分
    mutations: {}, // state 中的数据变更等等都必须通过它
    getters: {}, // 获取 state 中的数据，可以缓存，只有请求的时候 state 中的数据变了才会再次执行
    actions: {} // 提交 mutation，存放异步操作的地方(异步请求数据/异步修改之后提交给 mutation 操作修改)
  })

  ```
