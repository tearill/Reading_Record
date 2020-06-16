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

