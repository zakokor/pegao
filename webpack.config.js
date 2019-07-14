const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    //minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    minimizer: [
      new TerserJSPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        terserOptions: {
           extractComments: 'all',
           compress: {
               drop_console: true,
           },
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  entry:{
     main:'./dione/src/index.js',
    },
  output: {
      path: path.resolve(__dirname, 'dione/static/dist'),
      filename: '[name].bundle.js',
      chunkFilename:'[id][hash].js'
    },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: '[id].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  },
};
