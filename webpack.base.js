require("babel-polyfill");
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
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
module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src/containers'),
        use: [
          {
            loader: 'bundle-loader',
            options: {
              lazy: true,
              name: '[name]'
            }
          },
          "babel-loader"
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
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
          },
          "less-loader"
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true
            }
          },
          postcssConfig,
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          postcssConfig,
          {
            loader: 'sass-loader',
            options: {
              sassLoader: {
                includePaths: [
                  path.resolve(__dirname, "src/styles"),
                  path.resolve(__dirname, "src/components")
                ]
              }
            }
          }
        ],
      },
      {
        test: /\.svg$/,
        include: [
          /node_modules/,
          require.resolve('antd').replace(/warn\.js$/, ''),  // antd-mobile 内置svg
          path.resolve(__dirname, 'src/assets/img'),             // 业务代码本地私有 svg 存放目录
          path.resolve(__dirname, 'src/components')                 // 本地通用组件 svg 存放目录
        ],
        loader: "svg-sprite-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
              options: {
                name:'[path][name].[ext]',
                limit: 25000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Libs: path.resolve(__dirname, 'src/lib/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Modules: path.resolve(__dirname, 'src/modules/'),
      Common: path.resolve(__dirname, 'src/common/'),
      Images: path.resolve(__dirname, 'src/assets/img/'),
      ChartConfig: path.resolve(__dirname, 'src/chartConfig/')
    },
    mainFiles: ["index.web", "index"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
}
