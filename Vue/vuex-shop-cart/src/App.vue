<template>
  <div id="app">
    <!-- 将数据收归中央(vuex)集中管理 -->
    <div v-for="(product, index) in products" :key="index">
      {{ product.title }} - {{product.price}} - {{product.inventory}}
    </div>
    {{name}}
  </div>
</template>

<script>
// import Api from "@/api/shop.js"
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      // products: []
    }
  },
  computed: {
    // ...mapState(["products"])
    ...mapGetters(['products', 'name']),
  },
  mounted() {
    // 找老板 api
    // Api.getProducts((_products) => {
    //   this.products = _products
    // })
    // 找财务 vuex
    // console.log(this.$store)
    // console.log(this.$store.getters)
    // let products = this.getProducts()
    // this.updateProducts(products)
    this.getProducts()
  },
  methods: {
    ...mapMutations(['updateProducts']),
    ...mapActions(['getProducts'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
