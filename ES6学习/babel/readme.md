# babel.js 编译

babel === brower.js

- 方法一：引入 JS 文件(在线编译) --- 客户端完成  
  * 引入文件 browser.js
  * 修改 script 标签 type="text/babel"
  * 缺点：
    1. 降低客户端性能(延迟、卡顿)
    2. browser.js 本身就不兼容低版本浏览器

- 方法二：编译 JS 文件(离线编译)  
  * npm i @babel/core @babel/cli @babel/preset-env  
    npm i @babel/ployfill --- 补上浏览器缺少的方法
  * 配置 scripts: "build": "babel src -d dest" 
  * .babelrc 配置文件编写(告诉编译器要替换什么，预设)  
    ```
    {
        "presets": [
            "@babel/preset-env"
        ]
    }
    ```
  * npm run build