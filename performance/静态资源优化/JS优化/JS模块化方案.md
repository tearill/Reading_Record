# JS 模块化加载方案的选择

## JS 模块化加载方案和选型

- CommonJS - 同步加载的方式
  - 在 web 浏览器之外为 JS 建立模块生态系统
  - Node.js 模块化方案为 CommonJS
- AMD（Asynchronous Module Definition）异步模块定义
  - RequireJS 模块化加载器：基于 AMD API 实现
- CMD（Common Module Definition）通用模块定义
  - SeaJS 模块化加载器：遵循 CMD API 编写
- ES6 import