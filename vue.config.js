const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: '',
  // css: {
  //   loaderOptions: {
  //     css: {},
  //     postcss: {
  //       plugins: [
  //         require('postcss-px2rem')({
  //           remUnit: 75
  //         })
  //       ]
  //     }
  //   }
  // },


  // configureWebpack: config => {
  //   console.log("config");
  //   console.log(config);
  //   if (process.env.NODE_ENV === "development") {
  //     config.devtool = "source-map";
  //   } else if (process.env.NODE_ENV === "production") {
  //     config.devtool = "eval-source-map";
  //   }
  // }
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ? 'source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.ts'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: path.join(__dirname, './public/dll/phaser.manifest.json')
      }),
      new AddAssetHtmlPlugin([
          {
              filepath: path.resolve(__dirname, './public/dll/*.js'),
              // 文件输出目录
              outputPath: 'dll',
              // 脚本或链接标记的公共路径
              publicPath: 'dll'
          }
      ])
    ]
  }
}