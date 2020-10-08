import Vue from "vue";
import format from "date-fns/lightFormat";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/bootstrap.min.css";
import "@/assets/styles/style.scss";

Vue.config.productionTip = false;

// Global Filters
Vue.filter("formatDateStd", utc => format(utc, "dd-MM-yyyy hh:mm:ss a"));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
