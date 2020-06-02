<template>
  <div id="detail">
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">医生姓名</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入医生姓名" v-model="doctorInfo.docName" />
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
            v-model="doctorInfo.docPhone"
            @blur="checkPhone"
          />
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for class="weui-label">医生性别</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" v-model="doctorInfo.docSex">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for class="weui-label">省份</label>
        </div>
        <div class="weui-cell__bd">
          <select
            class="weui-select"
            name="select2"
            v-model="doctorInfo.docProvince"
            @change="getCity"
          >
            <option v-for="item in areaList" :key="item.ID" :value="item.name">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for class="weui-label">城市</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" v-model="doctorInfo.docCity">
            <option v-for="item in cityList" :key="item.ID" :value="item.name">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">医院</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="text"
            placeholder="请输入医院名称"
            v-model="doctorInfo.docHospital"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">科室</label>
        </div>
        <div class="weui-cell__bd">
          <input
            class="weui-input"
            type="text"
            placeholder="请输入科室名称"
            v-model="doctorInfo.docDepartment"
          />
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">类别</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" v-model="doctorInfo.sortID">
            <option value="0">全部</option>
            <option
              v-for="item in sortList"
              :key="item.sortID"
              :value="item.sortID"
            >{{item.sortName}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="weui-btn weui-btn_primary" style="margin-top:20px" @click="submit">提交</div>
    </div>

    <div class="dailog" v-if="isShowDialog">
      <div class="dailog-box">
        <div class="dailog-bg">
          <div class="close" @click="isShowDialog=false"></div>
          <span class="success">提交成功!</span>
        </div>
        <div class="dailog-content">
          <span class="tip">请复制以下链接并分享给对应的医生</span>
          <span class="link">{{link}}</span>
          <div class="copy" @click="copy">点击复制</div>
        </div>
      </div>
    </div>

    <div id="toast" style="opacity: 1; display: none;">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast" v-if="!success">
        <span class="weui-icon-warn weui-icon_msg"></span>
        <span class="weui-toast__content errMsg">已完成</span>
      </div>
      <div class="weui-toast" v-if="success">
        <span class="weui-icon-success weui-icon_msg"></span>
        <span class="weui-toast__content errMsg">复制成功</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addNewDoctor, getArea, getSort } from "@/api/doctor.js";
export default {
  data() {
    return {
      areaList: [],
      sortList: [],
      cityList: [],
      doctorInfo: {
        docName: "",
        docPhone: "",
        docSex: "男",
        docProvince: "",
        docCity: "",
        docHospital: "",
        docDepartment: "",
        sortID: 0
      },
      accessID: "",
      link: "",
      isShowDialog: false,
      success: false
    };
  },
  mounted() {
    this.getAreaList();
    this.getSortList();
  },
  methods: {
    getAreaList() {
      getArea().then(res => {
        if (res.data.success) {
          this.areaList = res.data.data;
          this.doctorInfo.docProvince = this.areaList[0].name;
          this.getCity();
        }
      });
    },
    getSortList() {
      getSort().then(res => {
        if (res.data.success) {
          this.sortList = res.data.data;
        }
      });
    },
    getCity() {
      this.areaList.forEach(item => {
        if (item.name == this.doctorInfo.docProvince) {
          this.cityList = item.child;
          this.doctorInfo.docCity = item.child[0].name;
        }
      });
    },
    submit() {
      if (!this.doctorInfo.docName) {
        $(".errMsg").html("医生姓名不能为空");
        this.showMsg();
      } else if (!this.doctorInfo.docPhone) {
        $(".errMsg").html("手机号不能为空");
        this.showMsg();
      } else if (!this.doctorInfo.docHospital) {
        $(".errMsg").html("医院不能为空");
        this.showMsg();
      } else if (!this.doctorInfo.docDepartment) {
        $(".errMsg").html("科室不能为空");
        this.showMsg();
      } else {
        let params = this.doctorInfo;
        addNewDoctor(params).then(res => {
          if (res.data.success) {
            this.isShowDialog = true;
            this.accessID = res.data.data;
            this.link =
              "http://" +
              location.hostname +
              "/#/trainContent?accessID=" +
              this.accessID;
          } else {
            $(".errMsg").html(res.data.msg);
            this.showMsg();
          }
        });
      }
    },
    checkPhone() {
      if (!/^[1]([3-9])[0-9]{9}$/.test(this.doctorInfo.docPhone)) {
        $(".errMsg").html("请输入正确的手机号");
        this.showMsg();
      }
    },
    copy() {
      var _input = document.createElement("input"); // 直接构建input
      _input.value = this.link; // 设置内容
      document.body.appendChild(_input); // 添加临时实例
      _input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(_input); // 删除临时实例
      this.success = true;
      this.showMsg();
      setTimeout(function() {
        this.success = false;
      }, 1000);
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

