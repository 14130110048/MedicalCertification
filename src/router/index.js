import Vue from "vue";
import Router from "vue-router";
import router from "../router";

const index = () => import("@/pages/index/index");
const personal = () => import("@/pages/personal/personal");
const saleMan = () => import("@/pages/personal/saleMan");
const personalDetail = () => import("@/pages/personal/personalDetail");
const train = () => import("@/pages/train/train");
const home = () => import("@/pages/home/home");
const doctorDetail = () => import("@/pages/doctor/detail");
const doctorList = () => import("@/pages/doctor/doctorList");
const trainContent = () => import("@/pages/train/trainContent");
const exam = () => import("@/pages/train/exam");
const notFound = () => import("@/pages/notFound/404");
const error = () => import("@/pages/notFound/error");
const auth = () => import("@/pages/notFound/auth");
const bindInfo = () => import("@/pages/personal/addUserInfo");


Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "index",
      component: index,
      redirect: "/auth",
      meta: {
        title: "我的"
      },
      children: [{
          path: "personal",
          name: "personal",
          component: personal,
          meta: {
            title: "我的"
          }
        },
        {
          path: "train",
          name: "train",
          component: train,
          meta: {
            title: "题库"
          }
        },
        {
          path: "home",
          name: "home",
          component: home,
          meta: {
            title: "首页"
          }
        }
      ]
    },
    {
      path: "/personalDetail",
      name: "personalDetail",
      component: personalDetail,
      meta: {
        title: "我的资料"
      }
    },
    {
      path: "/saleMan",
      name: "saleMan",
      component: saleMan,
      meta: {
        title: "所有业务员"
      }
    },
    {
      path: "/doctorDetail",
      name: "doctorDetail",
      component: doctorDetail,
      meta: {
        title: "添加医生"
      }
    },
    {
      path: "/doctorList",
      name: "doctorList",
      component: doctorList,
      meta: {
        title: "医生列表"
      }
    },
    {
      path: "/trainContent",
      name: "trainContent",
      component: trainContent,
      meta: {
        title: "文章内容"
      }
    },
    {
      path: "/exam",
      name: "exam",
      component: exam,
      meta: {
        title: "题目内容"
      }
    },
    {
      path: "/404",
      name: "notFound",
      component: notFound,
      meta: {
        title: "404"
      }
    },
    {
      path: "/error",
      name: "error",
      component: error,
      meta: {
        title: "error"
      }
    },
    {
      path: "/bindInfo",
      name: "bindInfo",
      component: bindInfo,
      meta: {
        title: "绑定"
      }
    },
    {
      path: "/auth",
      name: "auth",
      component: auth,
      meta: {
        title: "微信授权"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
