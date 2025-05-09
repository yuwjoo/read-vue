import Dotenv from "dotenv-webpack";
import webpackMerge from "webpack-merge";
import webpackBaseConfig from "./webpack.config.js";

export default webpackMerge(webpackBaseConfig, {
  mode: "development",
  plugins: [
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
});
