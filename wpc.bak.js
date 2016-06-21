var Webpack = require("webpack");
var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    entry: './src/entry.js' // 可定义多个
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: "[name].js",
    chunkFilename: "js/[id].chunk.js"
  },
  module: {
    loaders: [
      // {test: /\.html$/, loader: 'html'},
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css", "autoprefixer") },
      // {test: /\.css$/,loader: "style!css"},
      { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" }, // 添加到这！并且会按照文件大小, 或者转化为 base64, 或者单独作为文件
      //在大小限制后可以加上&name=./[name].[ext]，会将我们的文件生成在设定的文件夹下。
      { test: /\.(html|tpl)$/, loader: 'html-loader' },
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"), //单独使用style标签加载css并设置其路径
    new Webpack.BannerPlugin("这里是打包文件头部注释！"), //注意这是一个数组..
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      // favicon:'./src/img/favicon.ico', //favicon路径
      filename: './index.html', // 生成
      srcPath: 'entry.js',
      template: './src/index.html', //html模板路径
      inject: true, //允许插件修改哪些内容，包括head与body
      hash: true, //为静态资源生成hash值
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    })
  ],
  vue: {
    loaders: {
      css: 'style!css!autoprefixer',
    }
  },
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['', '.js', '.vue'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      filter: path.join(__dirname, './src/filters'),
      components: path.join(__dirname, './src/comps')
    }
  }
}
