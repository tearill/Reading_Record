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
      title: 'Bundle Html', // 指定 html 文件中的 title 标题
      filename: 'bundle.html' // 指定文件名
    }) // 加入 html-webpack-plugin 插件
    // 自动生成一个 html 入口文件
  ]
}
