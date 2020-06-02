<template>
  <div id="doctorList">
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
      <div class="list">
        <div v-for="item in doctorList" :key="item.ID" class="doctor">
          <div class="doctor-content">
            <span class="doctorInfo-time">{{item.createTime|formatDate}}</span>
            <span class="doctorInfo">{{item.docName}}</span>
            <span class="doctorInfo">
              <i>{{item.docSex}}</i>
              <i style="margin-left:30px;">{{item.docHospital}}</i>
              <i>{{item.docDepartment}}</i>
            </span>
            <span class="doctorInfo">
              <i class="phone"></i>
              <i>{{item.docPhone}}</i>
            </span>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { getMyDoctor, getDoctorsByUserID } from "@/api/userManage.js";
import dateFormat from "@/utils/date.js";
export default {
  data() {
    return {
      noData: "",
      userID: 10000,
      PageSize: 10,
      PageIndex: 1,
      doctorList: []
    };
  },
  watch: {
    doctorList(newVal, oldVal) {
      if (newVal == oldVal) {
        this.noData = "没有更多数据";
      }
    }
  },
  mounted() {
    this.userID = this.$route.query.userID ? this.$route.query.userID : null;
    this.getContent();
  },
  methods: {
    getContent() {
      let params = {
        userID: this.userID,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      };
      getDoctorsByUserID(params).then(res => {
        if (res.data.success) {
          if (res.data.data.date) {
            let data = res.data.data.date;
            data.forEach(item => {
              this.doctorList.push(item);
            });
          }
        }
      });
    },
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
        });
        return;
      }
      let self = this;
      let start = this.doctorList.length;

      setTimeout(() => {
        this.PageIndex++;
        this.getContent();
        // self.$refs.myscroller.resize();
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
        });
        // done();
      }, 500);
    },
    refresh() {
      this.timeout = setTimeout(() => {
        this.PageIndex = 1;
        this.doctorList = [];
        this.getContent();
        this.$refs.myscroller.finishPullToRefresh();
      }, 500);
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return dateFormat.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

