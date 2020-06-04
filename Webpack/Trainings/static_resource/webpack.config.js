const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.(jpe?g|png|gif|webp)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       // 文件命名
      //       name: '[name].[ext]',
      //       // 输出路径
      //       outputPath: 'imgs/'
      //     }
      //   }
      // },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]', // 名字 + 后缀
            outputPath: 'imgs/', // 输出路径
            limit: 10240 // 小于 10k 的图片转成 base64 编码
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // 动态的，不同的项目需求不一样
          // loader 不一样，出来的东西不一样
          'style-loader', // 生成静态资源内联，把导入的模块作为样式添加到 DOM
          {
            loader: MiniCssExtractPlugin.loader, // 抽离 css，从 js 中抽离出来单独作为一个文件
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development', // 热更新的情况下
              reloadAll: true
            }
          },
          'css-loader', // 处理文件
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 抽离 css，从 js 中抽离出来单独作为一个文件
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development', // 热更新的情况下
              reloadAll: true
            }
          },
          {
            loader: 'css-loader', // 解析 css 文件并处理内部的引用关系
            options: {
              importLoaders: 2 // 在 css-loader 之前执行的 loader 数量
            }
          },
          {
            loader: 'postcss-loader', // 补全前缀，兼容性，css 界的 babel
            options: {
              indent: 'postcss',
              plugins: loader => [
                require('autoprefixer')({ // 自动添加前缀，前缀兼容
                  browsers: ['> 0.15% in CN']
                })
              ]
            }
          },
          {
            loader: 'stylus-loader', // 先经过 stylus-loader 编译
            options: {
              preferPathResolver: 'webpack' // 优先使用 webpack 用于路径解析，找不到再使用 stylus-loader 的路径解析
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'css/[name].[hash:8].css', // 打包后文件名字
      // chunkFilename: 'css/[name].[hash:8].css', 
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    })
  ]
}