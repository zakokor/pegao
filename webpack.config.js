const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//require("@babel/polyfill");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const supportedLocales = ['en',]
const PurgecssPlugin = require('purgecss-webpack-plugin')
const PATHS = {
  src: path.join(__dirname, 'dione/src'),
  templates: path.join(__dirname, 'dione/templates'),
  base: path.join(__dirname, 'templates'),
}

module.exports = {
  /*externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },*/
  optimization: {
    //nodeEnv: 'production',
    minimize: true,
    /*splitChunks: { //para partir el bundle del vendor del core
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          //test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },*/
    //sideEffects: true,
    //usedExports: true,
    minimizer: [
      new TerserJSPlugin({
        //extractComments: true,
        //cache: true,
        //parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        }
      }),
      new OptimizeCSSAssetsPlugin({
        
        //cssProcessor: require('cssnano'),
        //cssProcessorOptions: { discardComments: { removeAll: true } },
      })
    ],
  },
  entry: {
    main: './dione/src/index.js',
    //main: ["@babel/polyfill", "./dione/src/index.js"],
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
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
          //"resolve-url-loader",
          "sass-loader"
        ]
      },
    ]
  },
};