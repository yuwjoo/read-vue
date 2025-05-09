import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import Dotenv from "dotenv-webpack";
import { fileURLToPath } from "url";

const resolve = (dir) => fileURLToPath(new URL(dir, import.meta.url));

export default {
  mode: "development",
  entry: {
    app: resolve("./src/main.js")
  },
  output: {
    path: resolve("./dist"),
    filename: "[name].js",
    clean: true
  },
  resolve: {
    extensions: [".js", ".vue"],
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
        loader: "vue-loader",
        resolve: {
          fullySpecified: false // 禁用es6导入的模块必须加后缀的限制
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        resolve: {
          fullySpecified: false // 禁用es6导入的模块必须加后缀的限制
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext][query]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "media/[hash][ext][query]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]"
        }
      },
      {
        test: /\.css$/i,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"]
              }
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/i,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"]
              }
            }
          },
          "stylus-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: '@use "@/assets/css/variable.scss" as *;'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("./index.html"),
      filename: "index.html"
    }),
    new VueLoaderPlugin(),
    new Dotenv({
      path: ".env.development"
    }) // 加载.env文件
  ],
  devtool: "cheap-module-source-map",
  devServer: {
    client: {
      overlay: false
    },
    port: 8080,
    proxy: [
      {
        context: "/chapterapi",
        target: "http://chapter2.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/chapterapi": ""
        }
      },
      {
        context: "/api",
        target: "http://api.zhuishushenqi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    ]
  }
};
