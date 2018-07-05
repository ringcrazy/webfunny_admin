const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require("clean-webpack-plugin");
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const baseConfig = require('./webpack.base.js');
const envConfig = require("./src/config/env_config.js");
const ManifestPlugin = require('webpack-manifest-plugin');

const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      autoprefixer({browsers: ['> 1%', 'last 4 versions']}),
      pxtorem({
          rootValue: 100,
          propWhiteList: [],
      })
    ]
  }
};

module.exports = env => {
  const curEnv = env || "local"
  const assetsUrl = envConfig.getAssetsUrl(curEnv, "/wac/")
  return Merge(baseConfig, {
    entry: {
      app: path.resolve(__dirname, 'src/index.js'),
      vendor: [
        'classnames', 'fastclick',
        'history/createBrowserHistory', 'moment',
        'prop-types', 'react',
        'react-dom', 'react-redux',
        'react-router-dom', 'react-router-redux',
        'react-time', 'react-transition-group',
        'redux', 'redux-actions',
        'redux-logger', 'redux-thunk',
        'antd-mobile/lib/tabs', 'antd-mobile/lib/toast', 'antd-mobile/lib/list', 'antd-mobile/lib/button',
        'antd-mobile/lib/input-item', 'antd-mobile/lib/icon', 'antd-mobile/lib/notice-bar', 'antd-mobile/lib/picker',
        'antd-mobile/lib/white-space', 'antd-mobile/lib/checkbox', 'antd-mobile/lib/flex', 'antd-mobile/lib/popup',
        'antd-mobile/lib/card', 'antd-mobile/lib/modal',
      ],
      // common: [
      //   'prius','zepto-webpack',
      //   'JS/lib/common-tool', 'JS/lib/underscore', 'JS/lib/cache', 'JS/lib/consts',
      //   'JS/lib/http-api', 'JS/lib/http-util'
      // ],
    },
    output: {
      filename: "[name].[chunkhash:8].js",
      chunkFilename: '[name].[chunkhash:8].chunk.js',
      path: path.resolve(__dirname, 'dist/wac'),
      publicPath: assetsUrl
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true
                }
              },
              postcssConfig
            ]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              postcssConfig,
              {
                loader: 'sass-loader',
                options: {
                  sassLoader: {
                    includePaths: [
                      path.resolve(__dirname, "src/style"),
                      path.resolve(__dirname, "src/components")
                    ]
                  }
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new CleanPlugin(['dist']),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'BUILD_ENV': JSON.stringify(curEnv)
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,                                                            // 最紧凑的输出
        comments: false,
        compress: {
          warnings: false,                                                          // 在UglifyJs删除没有用到的代码时不输出警告
          //drop_console: (curEnv === 'staging' || curEnv === 'prod'),
          collapse_vars: true,                                                      // 内嵌定义了但是只用到一次的变量
          reduce_vars: true,                                                        // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }),
      new ExtractTextPlugin({
        filename: "app.[contenthash:8].css",
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;   // this assumes your vendor imports exist in the node_modules directory
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        htmlWebpackPlugin: {
          'files': {
            'css': ['app.css'],
            'js': ['index.js', 'common.js']
          }
        },
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyJS: true
        },
        chunksSortMode: function (chunk1, chunk2) {
          var orders = ['common', 'vendor', 'debug', 'app'];
          var order1 = orders.indexOf(chunk1.names[0]);
          var order2 = orders.indexOf(chunk2.names[0]);
          if (order1 > order2) {
            return 1;
          } else if (order1 < order2) {
            return -1;
          } else {
            return 0;
          }
        }
      }),
      new webpack.ProvidePlugin({
        $: 'zepto-webpack'
      }),
      new ManifestPlugin({
        publicPath: assetsUrl
      })
    ]
  });
}
