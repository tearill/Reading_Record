# TypeScript-More  
- Ant-Design 引入  
  `npm i antd`  
- Ant-Design 定制样式和按需引用  
  `npm i react-app-rewired customize-cra babel-plugin-import less less-loader`  
  1. react-app-rewired: 用于定制 create-react-app(cra) 脚手架的一些配置，比如 Webpack 和 Babel 等，create-react-app 脚手架生成的文件中没有将 Webpack 和 Babel 等配置提供给使用者进行配置，无法进行个性化开发  
  2. customize-cra: 辅助 react-app-rewired 进行定制 create-react-app 中 Webpack 配置的一个库  
  3. babel-plugin-import: 配置可供开发者按需引用 antd 组件的 Babel 插件  
  4. less & less-loader: 用于定制化 antd 主题的 Webpack loader，antd 使用 less 作为样式化语言  
- Ant-Design 4.0 最新用于 icons 引入的包  
  `npm i @ant-design/icons`  

- 使用 create-react-rewired 代替 react-scripts 启动项目  
  ```js
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
  ```
- 修改 create-react-app 的配置  
  在根目录下新建 config-overrides.js  
  👉[配置参考](https://www.cnblogs.com/tommymarc/p/11991533.html)
  ```js
  const { override, fixBabelImports, addLessLoader } = require('customize-cra')
  const darkThemeVars = require('antd/dist/dark-theme')

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        hack: `true;@import "${require.resolve(
          "antd/lib/style/color/colorPalette.less"
        )}";`,
        ...darkThemeVars,
        "@primary-color": "#02b875"
      }
    })
  )
  ```
  导出一个修改 Webpack 配置的对象，使用 override API 包裹  
  1. fixBabelImport: 配置 antd 的按需引入  
  2. addLessLoader: 配置 antd 的主题样式