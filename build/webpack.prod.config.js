const ExtractTextPlugin = require('extract-text-webpack-plugin') //css分离插件
const HtmlWebpackPlugin = require('html-webpack-plugin') //html绑定js插件
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin') //css压缩 webpack4
const CopyWebpackPlugin = require('copy-webpack-plugin') //拷贝插件
const config = require('../config')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin //性能分析插件
const webpack = require('webpack')

module.exports = {
  // 开发模式
  mode: 'production',
  // node检测工具
  devtool: 'cheap-module-source-map',
  // 入口
  entry: {
    app: './src/index.js'
  },
  // 出口
  output: {
    path: config.prod.assetsRoot,
    filename: 'js/[name].[chunkhash:7].min.js'
  },
  // 模块
  module: {
    rules: [
      // babel 模块加载器
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      // css 模块加载器
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','postcss-loader'],
          publicPath: '../' //修改图片路径
        })
      },
      // ts 模块加载器
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      // 图片资源加载
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[hash].[ext]'
          // esModule: false
        }
      }
      // html img加载问题
      // {
      //     test: /\.html$/,
      //     loader: 'html-loader'
      // }
    ]
  },
  // 插件
  plugins: [
    // html绑定
    new HtmlWebpackPlugin({
      filename: config.prod.htmlRoot,
      template: 'page/index.html',
      chunks: ['app']
    }),
    //css
    new ExtractTextPlugin({
      filename: config.prod.cssRoot,
      allChunks: true
    }),
    //css压缩
    new OptimizeCssPlugin(),
    // 拷贝static文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.prod.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // 性能分析插件
    new BundleAnalyzerPlugin(),
    // 乱序entry引入文件 相对路径指引
    new webpack.HashedModuleIdsPlugin()
  ]
}
