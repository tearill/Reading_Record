# kbone 微信新推出的小程序框架  

## 项目初始化  

   `npm install -g kbone-cli`  
   `kbone init to-do-list`

- 快速构建 小程序 与 Web 端，通过一份页面代码可以同时维护两个端的代码  
  1. 构建  
    `npm run build`  
  2. web 端  
    `npm run web`  
  3. 小程序端  
    `npm run mp`  
    dist/mp 下 `npm i`  
    开发者工具中 `构建npm`  
    (如果是用的最新版本的 kbone-cli 初始化的项目可以不用构建 npm)

## 踩坑  

- 适配不支持 rpx --- 使用 rem 做移动端适配

- 每次编译后显示`更改AppID失败`  
  因为 Kbone 中未配置微信小程序的 AppID，在 build/miniprogram.config.js中补全自己的 AppID（需退出编译模式，重新编译）  

  ```js
    projectConfig: { appid: '' }
  ```  

- tabbar 配置在 build/miniprogram.config.js 中  

- 小程序相关配置在 build/miniprogram.config.js 中  

- 构建 npm 相关  
  开发者工具报错 `Uncaught Error: module "pages/ home/miniprogram-render" is not defined`  
  解决方案：开发者工具重新构建 npm  
  如果还是无法解决，删除打包出来的小程序文件，重新打包

## 多页开发  

- a 标签 或者是 button 标签结合 js 跳转  

- router/index.js 中配置 Vue 路由  

- build/miniprogram.config.js 中配置小程序路由  

- 小程序端单页面的 navigationBarTitleText 需要在 build/miniprogram.config.js 中的 pages 下配置(要添加 extra！)
