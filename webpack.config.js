const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PurgecssPlugin = require('purgecss-webpack-plugin')
const PATHS = {
  src: path.join(__dirname, 'dione/src'),
  templates: path.join(__dirname, 'dione/templates'),
  base: path.join(__dirname, 'templates'),
}

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  entry: {
    main: './dione/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dione/static/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id][hash].js'
  },
  //devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: '[id].css',
    }),
    //bundle analyzer on dev env
    /*new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),*/
    //activate on production env
    new PurgecssPlugin({
      paths: glob.sync([`${PATHS.src}/**/*`,`${PATHS.templates}/**/*`,`${PATHS.base}/**/*`],  { nodir: true }),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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