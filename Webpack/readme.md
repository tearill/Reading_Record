# Webpack 学习  
官网👉https://www.webpackjs.org  

<h1>--------------day1--------------</h1>

## 模块化的问题  
  JS 文件越来越复杂化，就要将不同的 JS 文件单独提取出来作为一个模块  
  - 模块化存在的问题  
    1. 变量名冲突  
    2. 加载顺序的问题  

  - 问题的解决方案  
    ES5： 
      + 使用匿名立即执行函数把内容放到函数单独的作用域中  
      + 产生的问题：同一个开发者写的不同模块之间的数据无法互用，模块的复用性差  
      + 解决方案：把所有的东西放到一个全局的模块对象 {} 中，把要复用的数据作为一个对象返回出去，这样就只需要规定模块命名方式防止重名  
    常见的模块化规范：CommonJS(只是一个规范，实现的例子是 node)、AMD、CMD、ES6 的 Modules  

  - CommonJS  
    模块化有两个核心：导出和导入  
    + CommonJS 的导出： 
      modules.exports = {}  
    + CommonJS 的导入：  
      require  

## Webpack  

- 认识 Webpack  
  Webpack 是一个现代的 JavaScript 应用的静态模块打包的工具  
  核心：模块和打包  
  (和 gulp 对比，gulp 更强调的是自动化，定义一些任务，Webpack 更强调的是模块化)  

- Webpack 的安装  
  `npm i webpack`  
  -D 选项表示开发环境，将来在上线项目运行的时候不需要，不上传  

- Webpack 的使用  
  + src 目录和 dist 目录  
    source  
    distribution(发布)  
    
  + 起步  
    使用 CommonJS 规范开发的代码浏览器无法解释执行，需要使用 webpack 打包成普通的 js 文件进行执行  
    `webpack ./src/main.js ./dist/bundle.js`  
  + 简单配置  
    webpack.config.js  
    + entry：入口  
    + output：输出文件，导出出口  
      ```js
      output: {
        path: '', // 使用 node 中的 path 动态获取绝对路径
        // path: path.resolve(__dirname, 'dist'),
        filename: ''  
      }
      ```
  + loader  
    开发中不仅会用到 js 处理，还需要加载 css、图片，也包括一些高级的将 ES6 转换成 ES5 代码等操作  
    1. 通过 npm 安装需要使用的 loader(不同的文件打包需要用到不同的 loader)  
    2. 在 webpack.config.js 中的 module 关键字下进行配置  
       ```js
       module: {
        rules: [
          {
            test: /\.css$/, // 文件匹配规则
            use: [ 'style-loader', 'css-loader' ] // 从右向左读取
          }
        ]
      }
       ```
    (样式文件的 loader 只负责样式文件的语法打包，样式还需要 style-loader 把导入的模块作为样式添加到 DOM)  
    文件的 loader：
    ```js
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 13000, // 限制文件大小
            name: 'img/[name].[hash:8].[ext]' // 按照规范进行命名
          }
        }
      ]
    }
    ```
    * 当加载的图片小于 limit 的时候会将图片编译成 base64 字符串形式  
    * 当加载的图片大于 limit 的时候要使用 file-loader 对图片进行编译 --- 在 dist 目录下生成一个相应的文件，文件名默认是一个32位的 hash 值(显示比较乱，可以自己按照规范设置名字的格式并统一放到一个文件夹中)  
    * 要防止重名问题  
      但是文件的路径会出问题，需要修改路径 --- 配置 output 中的 publicPath  
    Webpack 读取多个 loader 的数组的时候是从右向左读取的  

<h1>--------------day2--------------</h1>

- ES6 语法处理  
  使用 babel `npm i --save-dev babel-loader babel-core babel-preset-es2015`
  




总结：  
```js
module.exports={
  //入口文件的配置项
  entry:{},
  //出口文件的配置项
  output:{},
  //模块：例如解读CSS,图片如何转换，压缩
  module:{},
  //插件，用于生产模版和各项功能
  plugins:[],
  //配置webpack开发服务功能
  devServer:{}
}
```