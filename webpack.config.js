const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "./src/main.js")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    clean: true
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
      common: resolve("src/common"),
      router: resolve("src/router"),
      base: resolve("src/base"),
      utils: resolve("src/utils"),
      api: resolve("src/api")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.css$/i,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [require("autoprefixer")]
              }
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/i,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [require("autoprefixer")]
              }
            }
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"),
      filename: "index.html" // 输出的文件名
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    port: 8080
  }
};
