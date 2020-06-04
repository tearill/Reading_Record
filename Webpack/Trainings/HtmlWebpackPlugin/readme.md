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

- html-webpack-plugin 的常用配置  
  - `title`  
    生成 html 文件的标题  
    ```js
    new HtmlWebpackPlugin({
      title: 'bundle html'
    })
    ```

  - `filename`  
    输出的 html 的文件名称  
    ```js
    new HtmlWebpackPlugin({
      filename: 'bundle.html'
    })
    ```
  - `template`  
    html 模板所在的文件路径
    根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader，否则webpack不能正确解析  
    如果你设置的 title 和 filename 与模板中发生了冲突，那么以自己设置的 title 和 filename 的配置值为准  
    **最终生成的 html 文件会合并 `template` 中的引入和其他配置 / 插件生成的引入**
    ```js
    const path = require('path');
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    })
    ```

  - `inject`
    注入选项。有四个选项值 true, body, head, false  

    true：默认值，script标签位于html文件的 body 底部  
    body：script标签位于html文件的 body 底部（同 true）  
    head：script 标签位于 head 标签内  
    false：不插入生成的 js 文件，只是单纯的生成一个 html 文件  

  - `chunks`  
    chunks 主要用于多入口文件，当你有多个入口文件，编译后会生成多个打包后的文件，那么 chunks 就能选择你要使用哪些 js 文件   
    ```js
    entry: {
      index: path.resolve(__dirname, './src/index.js'),
      devor: path.resolve(__dirname, './src/devor.js'),
      main: path.resolve(__dirname, './src/main.js')
    }

    plugins: [
      new HtmlWebpackPlugin({
        chunks: ['index','main']
      })
    ]
    ```
    编译后：
    ```html
    <script type=text/javascript src="index.js"></script>
    <script type=text/javascript src="main.js"></script>
    ```
    如果没有指定 chunks 选项，默认会全部引用  

  - `excludeChunks`  
    排除掉一些 js  

  - `chunksSortMode` 控制生成 html 文件资源引入顺序，默认值 `auto`

    `none | auto | dependency | manual | {Function}`

    一般来说，都是使用默认值。但部分 webpack 3x 项目升级 webpack 4x 时会出现循环依赖报错，实际不会影响到项目运行，而排查起来十分恼火，故可能在某些特定情况下，你需要把它设置为 `none`。当然这绝对不是建议，只是可能需要。

  - `minify`  
    对 html 文件进行压缩，`mode: production` 时为 `true` 否则为 `false`

    但其他当然你还可以进行更详细的配置：
    ```js
    plugins:[
      new HtmlWebpackPlugin({
        //部分省略，具体看minify的配置
        minify: {
          //是否对大小写敏感，默认false
          caseSensitive: true,
          
          //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
          collapseBooleanAttributes: true,
          
          //是否去除空格，默认false
          collapseWhitespace: true,
          
          //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
          minifyCSS: true,
          
          //是否压缩html里的js（使用uglify-js进行的压缩）
          minifyJS: true,
          
          //Prevents the escaping of the values of attributes
          preventAttributesEscaping: true,
          
          //是否移除属性的引号 默认false
          removeAttributeQuotes: true,
          
          //是否移除注释 默认false
          removeComments: true,
          
          //从脚本和样式删除的注释 默认false
          removeCommentsFromCDATA: true,
          
          //是否删除空属性，默认false
          removeEmptyAttributes: true,
          
          //  若开启此项，生成的html中没有 body 和 head，html也未闭合
          removeOptionalTags: false, 
          
          //删除多余的属性
          removeRedundantAttributes: true, 
          
          //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
          removeScriptTypeAttributes: true,
          
          //删除style的类型属性， type="text/css" 同上
          removeStyleLinkTypeAttributes: true,
          
          //使用短的文档类型，默认false
          useShortDoctype: true,
          }
        }),
      ]
    ```

  - `hash`  
    给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false  
    