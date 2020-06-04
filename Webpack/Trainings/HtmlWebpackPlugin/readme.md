# HtmlWebpackPlugin 处理 html  
```bash
npm i html-webpack-plugin -D
```

- 在 webpack.config.js 中加入 html-webpack-plugin  
  ```js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    plugins: [
      new HtmlWebpackPlugin({ // 打包输出HTML
        title: 'Bundle Html',
        filename: 'bundle.html'
      }) // 加入 html-webpack-plugin 插件
      // 自动生成一个 html 入口文件
    ]
  }
  ```

- 配置 script  

- 报错踩坑  
  `Uncaught SyntaxError: Unexpected token '<'`  
  解决：相对路径加上 ./  