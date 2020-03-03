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

- 项目中用到的图片等静态资源  
  查了一下官方提供的文档，目前暂不支持相对路径，静态资源可以考虑转成 base64 或者使用网络地址，这里用了一个比较笨的办法，把图片上传到微博然后保存在线地址  

- 关于样式  
  rpx 在 kbone 中好像不支持，尝试过 vue+kbone 对 web 端采用px适配，在构建小程序时希望能转成rpx，但可惜的是不会这样，去微信开放社区看了一下说要用 rem 做适配(要在 mp-webpack-plugin 这个插件的配置中的 global 字段内补充 rem 配置)

- git 提交相关  
  直接使用 kbone-cli 初始化项目提交的时候默认会 push 到腾讯的 kbone 对应的项目模板，会直接被 deny access，解决方案是直接 clone 相应的模板，删除文件中的 .git 文件，根据自己的需要进行开发后再提交到自己的 github 上  
  Vue 模板 clone 地址👉<https://github.com/wechat-miniprogram/kbone-template-vue>

- eslint  
  使用 kbone-cli 脚手架模板开发默认是使用了 eslint 检查代码规范，有时候空格对了但是编译还是会报错，我的解决方案为了方便，比较简单粗暴，直接在 eslintignore 中把 src 忽略了，开发中不建议这么做  

## 多页开发  

- a 标签 或者是 button 标签结合 js 跳转  

- router/index.js 中配置 Vue 路由  

- 在 src/mp 下配置小程序页面的入口并建立相应的页面  

- build/miniprogram.config.js 中配置小程序路由(记得要修改 entry --- 小程序的入口)  

- 配置 build/webpack.mp.config.js 中的小程序端入口  

  <b>注意：小程序端加上 tabbar 之后跳转 tabbar 页面的时候默认入口路由是 / 所以要在 mp 目录下每个页面对应的 main.mp.js 中把路由设置成 / ，然后在 build/miniprogram.config.js 中的 redirect 选项中配置单页面的特殊路由跳转</b>

- 小程序端单页面的配置需要在 build/miniprogram.config.js 中的 pages 下配置(要添加 extra！)
