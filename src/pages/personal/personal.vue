<template>
  <div id="personal">
    <div class="top">
      <div class="top-bg">
        <div class="head-content">
          <div class="head">
            <img :src="userInfo.headImage" />
          </div>
          <div class="info">
            <div class="name">{{userInfo.name}}</div>
            <div class="phone">电话：{{userInfo.phone}}</div>
            <div
              class="city"
            >销售区域：{{userInfo.salesTerritory_Province}} {{userInfo.salesTerritory_City}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="maincontent">
      <div class="personal" @click="getPersonalDetail">
        <div class="icon-personal"></div>
        <div class="title">我的资料</div>
        <div class="jiantou">
          <div class="icon-jiantou"></div>
        </div>
      </div>
      <div class="yaoqing" @click="getDoctors">
        <div class="icon-yaoqing"></div>
        <div class="title">我的邀请</div>
        <div class="jiantou">
          <div class="icon-jiantou"></div>
        </div>
      </div>
      <div class="saleman" @click="getSaleMan">
        <div class="icon-saleman"></div>
        <div class="title">业务员</div>
        <div class="jiantou">
          <div class="icon-jiantou"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getToken } from "@/api/authorize.js";
import cookie from "js-cookie";
var flag = false;
export default {
  data() {
    return {
      userInfo: {},
      userID: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      let param = {};
      getUserInfo(param).then(res => {
        if (res.data.success) {
          this.userInfo = res.data.data;
          this.userID = res.data.data.userID;
        } else {
        }
      });
    },
    getPersonalDetail() {
      this.$router.push({
        name: "personalDetail"
      });
    },
    getDoctors() {
      this.$router.push({
        name: "doctorList",
        query: {
          userID: this.userID
        }
      });
    },
    getSaleMan() {
      this.$router.push({
        name: "saleMan"
      });
    }
  }
};
</script>

