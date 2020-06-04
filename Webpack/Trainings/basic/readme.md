# 基础打包知识  
Webpack 是一个 **Javascript** 应用程序的**静态模块打包器**，它会读取 Javascript 文件所需依赖，并把他们打包到一个或多个目标文件。

```bash
npm i webpack webpack-cli -D
```

- 目标  
  将 src/index.js 打包到 dist 目录下的 bundle.js  

- 配置 webpack.config.js  
  执行入口和打包输出位置  
  ```js
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    }
  }
  ```

- 配置 script  
  ```bash
  "build": "webpack"
  ```

