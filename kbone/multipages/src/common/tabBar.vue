<template>
  <div class="tabBar for-web">
    <div class="tabBar_border"></div>
    <div class="tabBar_item" v-for="(item, index) in list" :key="index" :data-path="item.pagePath" :data-index="index" @click="switchTab">
      <img :src="selected === index?item.selectedIconPath:item.iconPath">
      <span :class="selected === index ? 'selected' : ''">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      selected: 0,
      list: [{
        pagePath: '/index',
        text: '优选',
        iconPath: 'https://wx4.sinaimg.cn/mw690/beb0e147gy1gc6h7ow75dj200w00wdfm.jpg',
        selectedIconPath: 'https://wx2.sinaimg.cn/mw690/beb0e147gy1gc6h7oy3kcj200w00wa9u.jpg',
        selected: false
      }, {
        pagePath: '/explore',
        text: '发现',
        iconPath: 'https://wx4.sinaimg.cn/mw690/beb0e147gy1gc6h7owu4rj200w00wgle.jpg',
        selectedIconPath: 'https://wx1.sinaimg.cn/mw690/beb0e147gy1gc6h7oy6mrj200w00w3ya.jpg',
        selected: false
      }, {
        pagePath: '/cart',
        text: '购物车',
        iconPath: 'https://wx1.sinaimg.cn/mw690/beb0e147gy1gc6h7p0uofj200w00wmwx.jpg',
        selectedIconPath: 'https://wx2.sinaimg.cn/mw690/beb0e147gy1gc6h7p1hvhj200w00wdfl.jpg',
        selected: false
      }, {
        pagePath: '/me',
        text: '我的',
        iconPath: 'https://wx1.sinaimg.cn/mw690/beb0e147gy1gc6h7ox723j200w00w0si.jpg',
        selectedIconPath: 'https://wx4.sinaimg.cn/mw690/beb0e147gy1gc6h7p0hhij200w00wjr5.jpg',
        selected: false
      }]
    };
  },
  mounted() {
    console.log(this.$route.path, '111');
    let path = this.$route.path;
    switch (path) {
      case '/index':
        this.selected = 0;
        break;
      case '/explore':
        this.selected = 1;
        break;
      case '/cart':
        this.selected = 2;
        break;
      case '/me':
        this.selected = 3;
        break;
      default:
        break;
    }
  },
  methods: {
    switchTab(e) {
      // console.log(e.currentTarget.dataset);
      const { path, index } = e.currentTarget.dataset;
      console.log(e.currentTarget.dataset)
      window.location.href = path;
      this.selected = index;
    }
  }
};
</script>

<style lang="less">
.miniprogram-root {
  .for-web {
    display: none;
  }
}

.tabBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: #fff;
  display: flex;
  .tabBar_border {
    background-color: rgba(0, 0, 0, 0.33);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5); // 画 0.5px 的边框
  }
  .tabBar_item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    img {
      width: 27px;
      height: 27px;
    }
    span {
      font-size: 10px;
      background-color: #fff;
    }
    .selected {
      color: #DE554F;
    }
  }
}
</style>