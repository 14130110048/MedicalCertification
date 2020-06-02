<template>
  <div id="personalDetail">
    <!-- <div class="top">
      <div class="head">
        <img src="@/assets/images/head.jpg">
      </div>
      <div class="username">{{userInfo.name}}</div>
    </div>-->
    <div class="maincontent">
      <div class="personal-head">
        <div class="icon icon-nicheng"></div>
        <div class="title">头像</div>
        <div class="userInfo">
          <div class="head">
            <img :src="userInfo.headImage" />
          </div>
        </div>
      </div>
      <div class="personal">
        <div class="icon icon-nicheng"></div>
        <div class="title">真实姓名</div>
        <div class="userInfo">{{userInfo.name}}</div>
      </div>
      <div class="personal">
        <div class="icon icon-nicheng"></div>
        <div class="title">昵称</div>
        <div class="userInfo">{{userInfo.wx_NickName}}</div>
      </div>
      <div class="personal">
        <div class="icon icon-xingbie"></div>
        <div class="title">性别</div>
        <div class="userInfo">{{userInfo.sex}}</div>
      </div>
      <div class="personal">
        <div class="icon icon-quyu"></div>
        <div class="title">销售区域</div>
        <div class="userInfo">{{userInfo.salesTerritory_Province}}/{{userInfo.salesTerritory_City}}</div>
      </div>
      <div class="personal">
        <div class="icon icon-dianhua"></div>
        <div class="title">电话</div>
        <div class="userInfo">{{userInfo.phone}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/authorize.js";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      let params = {};
      getUserInfo(params).then(res => {
        if (res.data.success) {
          this.userInfo = res.data.data;
        }
      });
    },
    getPersonalDetail() {}
  }
};
</script>

