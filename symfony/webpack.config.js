const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    bootstrap_legacy: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/jquery-ui-bundle/jquery-ui.js',
      './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
      './assets/js/bootstrap_legacy.js',
      './assets/scss/styles.scss'
    ],
    bootstrap_esm: [
      './assets/js/bootstrap_esm.js',
      './assets/scss/styles.scss'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              publicPath: " images/",
              name(file) {
                // if (process.env.NODE_ENV === 'development') {
                return "[name].[ext]";
                // }

                // return '[hash].[ext]'
              }
            }
          }
        ]
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   // name: "vendors",
        //   chunks: "all",
        //   priority: -10,
        //   reuseExistingChunk: true
        // },
        // styles: {
        //   // name: "styles",
        //   test: /\.css$/,
        //   chunks: "all",
        //   enforce: true
        // }
  //     }
  //   }
  // }
};
