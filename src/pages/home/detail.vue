<template>
  <div id="detail">
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">医生姓名</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入医生姓名" v-model="doctorInfo.docName">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" placeholder="请输入手机号" v-model="doctorInfo.docPhone">
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
          >
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
          >
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
      <div class="weui-cell">
        <div class="weui-btn weui-btn_primary" @click="submit">提交</div>
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
      }
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
      let params = this.doctorInfo;
      addNewDoctor(params).then(res => {
        if (res.data.success) {
         
        }
      });
    }
  }
};
</script>

