<template>
  <div id="saleManList">
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
      <div class="list">
        <div v-for="item in saleManList" :key="item.ID" class="doctor" @click="getDoctor(item.id)">
          <div class="doctor-content">
            <!-- <span class="doctorInfo-time">{{item.createTime|formatDate}}</span> -->
            <span class="doctorInfo">{{item.name}}</span>
            <span class="doctorInfo">
              <i>{{item.sex}}</i>
              <i style="margin-left:30px;">{{item.salesTerritory_Province}}</i>
              <i>{{item.salesTerritory_City}}</i>
            </span>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { getSalesmen } from "@/api/userManage.js";
import dateFormat from "@/utils/date.js";
export default {
  data() {
    return {
      noData: "",
      userID: 10000,
      PageSize: 10,
      PageIndex: 1,
      saleManList: []
    };
  },
  watch: {
    saleManList(newVal, oldVal) {
      if (newVal == oldVal) {
        this.noData = "没有更多数据";
      }
    }
  },
  mounted() {
    this.getContent();
  },
  methods: {
    getContent() {
      let params = {
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      };
      getSalesmen(params).then(res => {
        if (res.data.success) {
          if (res.data.data.date) {
            let data = res.data.data.date;
            data.forEach(item => {
              this.saleManList.push(item);
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
      let start = this.saleManList.length;

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
        this.saleManList = [];
        this.getContent();
        this.$refs.myscroller.finishPullToRefresh();
      }, 500);
    },
    getDoctor(userID) {
      this.$router.push({
        name: "doctorList",
        query: {
          userID: userID
        }
      });
    }
  }
};
</script>

