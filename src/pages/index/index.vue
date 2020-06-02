<template>
  <div id="index">
    <div class="page">
      <div class="page__bd" style="height: 100%;">
        <div class="weui-tab">
          <div class="weui-tab__panel">
            <router-view/>
          </div>
          <div class="weui-tabbar">
            <div
              :class="tabIndex==0?'weui-bar__item_on':''"
              class="weui-tabbar__item"
              @click="show(0)"
            >
              <span style="display: inline-block;position: relative;">
                <div class="weui-tabbar__icon icon-home"></div>
              </span>
              <p class="weui-tabbar__label">首页</p>
            </div>
            <div
              :class="tabIndex==1?'weui-bar__item_on':''"
              class="weui-tabbar__item"
              @click="show(1)"
            >
              <div class="weui-tabbar__icon icon-tiku"></div>
              <p class="weui-tabbar__label">题库</p>
            </div>
            <div
              :class="tabIndex==2?'weui-bar__item_on':''"
              class="weui-tabbar__item"
              @click="show(2)"
            >
              <div class="weui-tabbar__icon icon-wode"></div>
              <p class="weui-tabbar__label">我的</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDoctors } from "@/api/userManage.js";
export default {
  data() {
    return {
      tabIndex: 2
    };
  },
  mounted() {
    //刷新时路由回显
    let route = this.$route.path;
    if (route == "/home") {
      this.tabIndex = 0;
    } else if (route == "/train") {
      this.tabIndex = 1;
    } else {
      this.tabIndex = 2;
    }
  },
  methods: {
    show(val) {
      this.tabIndex = val;
      if (val == 0) {
        this.$router.push({ name: "home" });
      } else if (val == 1) {
        this.$router.push({ name: "train" });
      } else {
        this.$router.push({ name: "personal" });
      }
    }
  }
};
</script>

