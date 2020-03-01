const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/' // 在所有的输出 url 前面加上固定的路径
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 文件匹配规则
        use: [ 'style-loader', 'css-loader' ] // 从右向左读取
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // 创建样式节点
        }, {
          loader: 'css-loader' // 将 css 翻译为 CommonJS 规范
        }, {
          loader: 'less-loader' // 将 less 编译成 css
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 限制文件大小 当加载的图片小于 limit 的时候会将图片编译成 base64 字符串形式
              // 当加载的图片大于 limit 的时候需要使用 file-loader 进行加载
              limit: 13000,
              name: 'img/[name].[hash:8].[ext]' // 按照规范进行命名
            },
          }
        ]
      }
    ]
  }
}