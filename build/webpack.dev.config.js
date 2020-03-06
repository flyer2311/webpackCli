const webpack = require('webpack')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin') //html绑定js插件

module.exports = {
  // 开发模式
  mode: 'development',
  // node检测工具
  devtool: 'cheap-module-eval-source-map',
  // 入口
  entry: {
    app: './src/index.js'
  },
  // 出口
  output: {
    path: config.dev.assetsRoot,
    filename: 'js/[name].js'
  },
  // 模块
  module: {
    rules: [
      // babel 模块加载器
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // css 模块加载器
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      // ts 模块加载器
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      // 图片url加载
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  // 插件
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // html绑定
    new HtmlWebpackPlugin({
      filename: config.prod.htmlRoot,
      template: 'page/index.html',
      chunks: ['app']
    })
  ],
  // 服务器配置
  devServer: {
    open: true,
    port: 1234
  }
}
