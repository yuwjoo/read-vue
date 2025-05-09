import Vue from "vue";
import App from "./App";
import Ajax from "utils/ajax";
import router from "./router/index";
import store from "./store";
import VueLazyload from "vue-lazyload";
import "common/stylus/index.styl";
import Vant from "vant";
import "vant/lib/index.css";
import loadingImg from "common/image/loading/lazy-loading.jpg";

Vue.config.productionTip = false;

Vue.use(Ajax, {
  baseURL: "/api"
});

Vue.use(VueLazyload, {
  loading: loadingImg
});

Vue.use(Vant);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)
});
