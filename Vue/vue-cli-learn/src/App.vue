<template>
  <div id="app">
    <h1><router-link to="/">学习列表</router-link></h1>
    <div id="nav">
      <router-link to="/demo1">Demo1</router-link> |
      <router-link to="/calculator">Calculator</router-link> |
      <router-link to="/demo2">key in v-for</router-link> |
      <router-link to="/brandDemo">brand demo</router-link> |
      <router-link to="/filter">filter demo</router-link> |
      <router-link to="/directive">directive demo</router-link> |
      <router-link to="/lifecycle">lifecycle</router-link> |
      <router-link to="/computed-watch">computed&&watch</router-link> |
      <router-link to="/ref">ref</router-link> |
      <router-link to="/component-1">component-1</router-link> |
      <router-link to="/component-2">component-2</router-link> |
      <router-link to="/component-3">component-3</router-link> |
      <router-link to="/component-4">component-4</router-link> |
      <router-link to="/slot-scope">slot-scope</router-link> |
      <router-link to="/slot-scope2">slot-scope2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h1 {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
