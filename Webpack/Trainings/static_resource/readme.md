# 打包图片、样式和字体等静态资源  

## Loaders  
官网对 Loaders 的介绍很简单，只有简单三点：  
- 可以用 Loaders 打包任何 Javascript 之外的任何静态资源  
- 用 Node.js 编写一个 Loader 很简单  
- 激活 Loader 有两种方式：  
  - 在引入语句中添加 `loaderName!` , 比如 `import 'style-loader!css-loader?modules!./css/test.css'`  
  - `rules` 中配置  

```bash
npm i html-webpack-plugin -D
```
使用 html-webpack-plugin 将打包的效果可视化出来  

## 处理图片资源  
- 方式一：使用 file-loader  
```bash
npm i file-loader -D
```
一般情况下对图片资源的处理是直接将图片打包(复制)到打包的目标文件夹下  
```js
module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|webp|)$/,
        use: {
          loader: 'file-loader',
          options: {
            // 文件命名
            name: '[name].[ext]',
            // 输出路径
            outputPath: 'imgs/'
          }
        }
      }
    ]
  }
```
图片文件会被直接复制到目标文件的 imgs 文件夹下  

- 方式二：使用 url-loader  
```bash
npm i url-loader -D
```
将小于限制大小的图片文件转换成 base64 格式  
```js
{
  test: /\.(jpe?g|png|gif|webp)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]', // 名字 + 后缀
      outputPath: 'imgs/', // 输出路径
      limit: 10240 // 单位：字节，小于 10k 的图片转成 base64 编码
    }
  }
}
```
  - 大于 10k 的图片  
  ```js
  /***/ "./src/imgs/oneFrame.png":
  /*!*******************************!*\
    !*** ./src/imgs/oneFrame.png ***!
    \*******************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"imgs/oneFrame.png\");\n\n//# sourceURL=webpack:///./src/imgs/oneFrame.png?");

  /***/ }),
  ```
  - 小于 10k 的图片  
  ```js
  /***/ "./src/imgs/avatar.jpg":
  /*!*****************************!*\
    !*** ./src/imgs/avatar.jpg ***!
    \*****************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"data:image/jpeg;base64,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\");\n\n//# sourceURL=webpack:///./src/imgs/avatar.jpg?");

  /***/ }),
  ```

## 处理样式  
### css-loader + style-loader  
```bash
npm i css-loader style-loader -D
```
- `css-loader` 解析 CSS 文件
- `style-loader` 把样式插入到 DOM 中

```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}
```

此时执行 `webpack` 就能正确打包了，但并不会再 `dist/` 下生成 `.css` 文件，而是把样式以 `style` 标签的形式插入到 `index.html` 的 `head` 标签中（在浏览器控制台查看，插入前样式文件在 JS 中）

### css 预处理器  
stylus  
```bash
npm i stylus stylus-loader -D
```

```js
{
  test: /\.styl(us)?$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader', // 解析 css 文件并处理内部的引用关系
      options: {
        importLoaders: 1 // 在 css-loader 之前执行的 loader 数量
      }
    },
    {
      loader: 'stylus-loader', // 先经过 stylus-loader 编译
      options: {
        preferPathResolver: 'webpack' // 优先使用 webpack 用于路径解析，找不到再使用 stylus-loader 的路径解析
      }
    }
  ]
}
```

### PostCss 自动补全前缀  
```bash
npm i postcss-loader -D
```
PostCSS 配置文件 `postcss.config.js` ，配置自动补全（需要 `autoprefixer` 插件）  
```bash
npm i autoprefixer -D
```

### mini-css-extract-plugin 从 JS 中抽离样式作为单独文件  
```bash
npm i mini-css-extract-plugin -D
```

把 `style-loader` 替换为 MiniCssExtractPlugin Loader  

**顺序：stylus-loader 预编译成为 css 文件 -> postcss-loader 补全前缀(autoprefix) -> css-loader 解析 css 文件(分析内部依赖关系) -> style-loader 把样式插入到 DOM 中，静态资源内联**  

## 处理字体文件  
使用 file-loader 和 url-loader  
