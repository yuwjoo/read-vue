import axios from "axios";

export default {
  install(Vue, option = {}) {
    const http = axios.create(option);
    http.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        console.log(config);
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    Vue.http = http;
    Vue.prototype.$http = http;
  }
};
