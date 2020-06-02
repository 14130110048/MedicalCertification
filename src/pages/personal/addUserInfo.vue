<template>
  <div id="detail">
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">真实姓名</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入真实姓名" v-model="userInfo.name" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="tel"
            placeholder="请输入手机号"
            v-model="userInfo.phone"
            @blur="checkPhone"
          />
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for class="weui-label">性别</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" v-model="userInfo.sex">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">身份证号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="tel"
            placeholder="请输入身份证号"
            v-model="userInfo.idCard"
            @blur="checkIdCard"
          />
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for class="weui-label">销售省份</label>
        </div>
        <div class="weui-cell__bd">
          <select
            class="weui-select"
            name="select2"
            v-model="userInfo.salesTerritory_Province"
            @change="getCity"
          >
            <option v-for="item in areaList" :key="item.ID" :value="item.name">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for class="weui-label">销售城市</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" v-model="userInfo.salesTerritory_City">
            <option v-for="item in cityList" :key="item.ID" :value="item.name">{{item.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="weui-btn weui-btn_primary" style="margin-top:20px" @click="submit">提交</div>
    </div>
    <div id="toast" style="opacity: 1; display: none;">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <span class="weui-icon-warn weui-icon_msg"></span>
        <span class="weui-toast__content errMsg">已完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getArea, getSort } from "@/api/doctor.js";
import { bindInfo, getToken } from "@/api/authorize.js";
import cookie from "js-cookie";
export default {
  data() {
    return {
      areaList: [],
      cityList: [],
      userInfo: {
        name: "",
        phone: "",
        sex: "男",
        idCard: "",
        salesTerritory_Province: "",
        salesTerritory_City: ""
      }
    };
  },
  beforeCreate() {
    let type = this.$route.query.type;
    if (type == 3) {
      window.location.href =
        window.apiConfig.wx_url +
        "?appid=" +
        window.apiConfig.appID +
        "&redirect_uri=" +
        encodeURIComponent(window.apiConfig.redirect_url1) +
        "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
    var getQueryString = function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    let code = getQueryString("code");
    if ((!type || type == null) && code) {
      let param = {
        code: code
      };
      getToken(param)
        .then(res => {
          if (res.data.success) {
            let token = res.data.data.token;
            cookie.set("token", token);
          }
        })
        .catch(err => {
          this.$router.push({
            name: "error"
          });
        });
    }
  },
  mounted() {
    this.getAreaList();
  },
  methods: {
    getAreaList() {
      getArea().then(res => {
        if (res.data.success) {
          this.areaList = res.data.data;
          this.userInfo.salesTerritory_Province = this.areaList[0].name;
          this.getCity();
        }
      });
    },
    getCity() {
      this.areaList.forEach(item => {
        if (item.name == this.userInfo.salesTerritory_Province) {
          this.cityList = item.child;
          this.userInfo.salesTerritory_City = item.child[0].name;
        }
      });
    },
    submit() {
      if (!this.userInfo.name) {
        $(".errMsg").html("姓名不能为空");
        this.showMsg();
      } else if (!this.userInfo.phone) {
        $(".errMsg").html("手机号不能为空");
        this.showMsg();
      } else if (!this.userInfo.idCard) {
        $(".errMsg").html("身份证号不能为空");
        this.showMsg();
      } else {
        let params = this.userInfo;
        bindInfo(params)
          .then(res => {
            if (res.data.success) {
              this.$router.push({
                name: "personal"
              });
            } else {
              $(".errMsg").html(res.data.msg);
              this.showMsg();
            }
          })
          .catch(err => {
            $(".errMsg").html(err);
            this.showMsg();
          });
      }
    },
    checkPhone() {
      if (!/^[1]([3-9])[0-9]{9}$/.test(this.userInfo.phone)) {
        $(".errMsg").html("请输入正确的手机号");
        this.showMsg();
      }
    },
    checkIdCard() {
      if (
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.userInfo.idCard)
      ) {
        $(".errMsg").html("请输入正确的身份证号");
        this.showMsg();
      }
    },
    showMsg() {
      var $toast = $("#toast");
      if ($toast.css("display") != "none") return;
      $toast.fadeIn(100);
      setTimeout(function() {
        $toast.fadeOut(100);
      }, 1000);
    }
  }
};
</script>

