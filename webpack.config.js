const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
// const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devServer: {
    port: 4000,
    open: true,
    contentBase: path.join(__dirname, "dist"),
    hot: true
  },
  entry: {
    index: './src/js/app.js'
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  //devtool 不会产生单独的文件， 但是可以显示行和列
  devtool: 'eval-source-map',
  plugins: [
    // 清除dist文件夹
    new CleanWebpackPlugin(),
    // 压缩css
    new OptimizeCss({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true //是否将插件信息打印到控制台
    }),
    // html中自动添加 script
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // filename: 'view/index.html',   // 使用link引入css时 img路径问题需跟css url一致
      filename: 'index.html',
      chunks: ['index'],
      hash: true
    }),
    // 将样式通过link标签引入
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
    new webpack.NamedChunksPlugin(),        // 打印更新的模块路劲
    new webpack.HotModuleReplacementPlugin()// 热更新插件
  ],
  module: {
    noParse: /jquery/,    // 不去解析jquery中的依赖库 优化打包速度
    rules: [
      // html中引入的图片进行打包
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              attr: ['img:src', 'img:data-src']
            }
          }
        ]
      },

      //css js中引入图片进行打包
      {
        test: /\.(png|jpg|gif)$/,
        // 做一个限制 当我们的图片小于多少K的时候 用base64来转化
        // 否则用file-loader 
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100 * 1024,    // 小于多少转化成base64
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',    // 将class语法转化
            ],
          }
        },
        include: path.resolve(__dirname, 'src'),  // 希望找这个文件下的js
        // exclude: /node_modules/ // 排除这个文件下的js
      },
      // style-loader 把css插入到head的标签中
      // MiniCssExtractPlugin 将样式通过link标签引入 使用这个插件将不进行css热更新
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',   //自动加css前缀 需要配置文件postcss.config.js
        ]
      }
    ]
  }
}