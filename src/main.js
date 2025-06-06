import Vue from 'vue'
import App from './App'
import Ajax from 'utils/ajax'
import router from './router/index'
import store from './store'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false

Vue.use(Ajax, {
  baseURL: '/api'
})

Vue.use(VueLazyload, {
  loading: require('common/image/loading/lazy-loading.jpg')
})

Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


