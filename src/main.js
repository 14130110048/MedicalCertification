// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import $ from "jquery";
import weui from "weui.js";
import "weui";
import "@/assets/styles/index.scss";
// import "./permission";
//下拉刷新，上拉加载更多
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);
Vue.prototype.$weui = weui;
//轮播
import VueAwesomeSwiper from 'vue-awesome-swiper';
/* 样式的话，我这里有用到分页器，就在全局中引入了样式 */
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
