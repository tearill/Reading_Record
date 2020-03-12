// 数据管理的地方/部门/财务
import Vue from 'vue'
import Vuex from 'vuex' // 请财务
import Api from '@/api/shop.js'

Vue.use(Vuex)

// let products = []
// Api.getProducts((_products) => {
//   // console.log(_products)
//   products = _products
// })

export default new Vuex.Store({ // 创建一个数据管理部门
  state: { // 相当于组件中的 data，vuex 中的数据
    products: [],
    name: "范家农庄"
  },
  mutations: { // 更改 state 中的数据唯一方法是提交 mutation
    updateProducts(state, _products) {
      state.products = _products
    }
  },
  getters: { // 获取 state 中的属性并缓存下来
    products(state) {
      return state.products
    },
    name(state) {
      return state.name
    }
  },
  actions: { // 提交一个 mutation，可以包含异步操作
    async getProducts({ commit }) {
      let products = []
      products = await Api.getProducts()
      console.log(products)
      // console.log(products)      
      commit('updateProducts', products)
    }
  },
  modules: {
    
  }
})
