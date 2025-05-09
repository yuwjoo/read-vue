import Dotenv from "dotenv-webpack";
import webpackMerge from "webpack-merge";
import webpackBaseConfig from "./webpack.config.js";

export default webpackMerge(webpackBaseConfig, {
  mode: "production",
  plugins: [
    new Dotenv({
      path: ".env.production"
    }) // 加载.env文件
  ]
});
