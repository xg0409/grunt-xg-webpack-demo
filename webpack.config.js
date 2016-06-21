var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
// webpack 编译的output 路径为 path + filename
// 请求静态资源虚拟路径地址 publicPath + filename
module.exports = {
  entry: [
    "webpack-dev-server/client?http://127.0.0.1:8080", // WebpackDevServer host and port
    "webpack/hot/dev-server",
    "./app/activities/index.js"
  ],
  output: {
    path: path.join(__dirname, "public/activities/"),
    // 静态资源虚拟路径地址 publicPath + filename
    // publicPath: "public/assets/"
    publicPath: "http://localhost:8080/public/app/activities/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      // {test: /\.css$/,loader: "style!css"},
      { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" }, // 添加到这！并且会按照文件大小, 或者转化为 base64, 或者单独作为文件
      //在大小限制后可以加上&name=./[name].[ext]，会将我们的文件生成在设定的文件夹下。
      // { test: /\.(html|tpl)$/, loader: 'html-loader' },
    ]
  },
  devServer: {
    contentBase: 'views/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("bundle.css",{ allChunks: true })
  ]
};
