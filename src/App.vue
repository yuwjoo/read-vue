<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabs></tabs>
  </div>
</template>

<script>
import Tabs from "components/tabs/tabs";
import BookText from "components/book-text/book-text";
import dsbridge from "dsbridge";
import { useFly } from "./utils/fly";

export default {
  components: {
    Tabs,
    BookText
  },
  mounted() {
    // dsbridge.call("testSyn", "开始");
    // useFly()
    //   .get("https://www.baidu.com/")
    //   .then((res) => {
    //     dsbridge.call("testSyn", res);
    //   }).catch((err) => {
    //     dsbridge.call("testSyn", err);
    //   });
    // //同步调用
    // var str = dsbridge.call("testSyn", "testSyn");

    // console.log("同步调用", str);

    // //异步调用
    // dsbridge.call("testAsyn", "testAsyn", function (v) {
    //   console.log("异步调用", v);
    // });

    // //注册 javascript API
    // dsbridge.register("addValue", function (l, r) {
    //   return l + r;
    // });
  }
};
</script>

<style scoped lang="stylus"></style>
