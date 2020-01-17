require("@babel/polyfill");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const dotenv = require("dotenv");

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);

  return prev;
}, {});

const debug =
  process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "staging";

module.exports = {
  module: {
    // our rules
    rules: [
      // first rule for babel-loader
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx?$/,
        resolve: {
          extensions: [".js", ".jsx"]
        }
      },
      // second rule for css loader
      {
        test: /\.css$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: "global"
            }
          }
        ]
      },

      // third rule for less loaders
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: /stylesheets/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },

      // run css modules loader
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]",
              importLoaders: 2,
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      },

      //fourth rule for file type loaders
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        loader: "url-loader?limit=100000"
      },

      // firth rule for html loaders
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
    //end of rule
  },
  devServer: {
    historyApiFallback: true
  },

  node: {
    fs: "empty"
  },

  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },

  target: "web",

  // our plugin definition
  plugins: [
    debug
      ? new CopyPlugin([
          {
            from: "public/image",
            to: "public/image",
            force: true
          }
        ])
      : [],
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico"
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin(envKeys),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ImageminPlugin({
      disable: debug,
      test: /\.(jpe?g|png|gif|svg)$/i
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
