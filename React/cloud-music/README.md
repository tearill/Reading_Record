# React Hooks 与 Immutable 数据流实战 —— Cloud Music  
- 目录结构  
  ```bash
  ├─api                   // 网路请求代码、工具类函数和相关配置
  ├─application           // 项目核心功能
  ├─assets                // 字体配置及全局样式
  ├─baseUI                // 基础 UI 轮子
  ├─components            // 可复用的 UI 组件
  ├─routes                // 路由配置文件
  └─store                 // redux 相关文件
    App.js                // 根组件
    index.js              // 入口文件
    serviceWorker.js      // PWA 离线应用配置
    style.js              // 默认样式
  ```

- 前端部分  
  1. react v16.8 全家桶 (react，react-router): 构建用户界面的 MVVM 框架  
  2. redux：状态管理  
  3. redux-thunk：处理异步逻辑的 redux 中间件  
  4. immutable：持久性数据结构处理的库  
  5. react-lazyload：react 懒加载  
  6. better-scroll：提升移动端滑动效果  
  7. styled-component：UI 组件，css in js  
  8. axios：http 请求库  

- 后端  
  接口：采用 github 开源 NeteaseCloudMusicApi -> https://github.com/Binaryify/NeteaseCloudMusicApi  

- fastclick  
  解决移动端点击延迟 300ms 的问题  

## 初始项目搭建  
- 路由配置  
  /routes/index.js => 利用 react-router-config 配置，可以写成类似于 Vue 中路由配置的数组形式  
  renderRoutes 方法读取路由配置并转换为对应 Route 标签  
  renderRoutes 方法只渲染一层路由，对于层次深的组件需要在父组件再次调用 renderRoutes  
  
- 公共组件开发  
  - 全局样式 assets/global-style.js  
  - 顶部 tab 栏 Home/style.js  

- redux  
  ```bash
  npm i redux react-redux redux-thunk redux-immutable immutable -S
  ```

- 轮播图开发  
  `npm i slider -S`  

- 推荐列表开发  

- scroll 组件封装  
  `npm i better-scroll@next -S`  
  下拉产生间隙 => 修改轮播图 Slider 的 .before div  
  - Content 样式组件  
    better-scroll 的原理是在容器元素高度固定，当子元素高度超过容器元素高度时，通过 transfrom 动画产生滑动效果，因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。而 Content 就是这个外部容器  