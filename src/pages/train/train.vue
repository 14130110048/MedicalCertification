<template>
  <div id="train">
    <div class="sousuo" @click="isShowDialog=true"></div>
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
      <div class="trainconent">
        <div
          class="trainList"
          :class="'trainList-'+(index%4)"
          v-for="(item,index) in trainList"
          :key="item.id"
          @click="getTrainContent(item.id)"
        >
          <div class="title">{{item.trainTitle}}</div>
          <div class="content">{{item.trainDesc}}</div>
        </div>
        <!-- <div class="noData" v-if="trainList.length<=0"></div> -->
        <div v-if="trainList.length<=0"></div>
      </div>
    </scroller>
    <div class="dailog" v-if="isShowDialog">
      <div class="dailog-box">
        <div class="dailog-title">全部分类</div>
        <div class="dailog-sort">
          <span @click="selectSortID=0" :class="selectSortID==0?'spanSelected':''">全部</span>
          <span
            v-for="item in sortList"
            :key="item.ID"
            @click="selectSortID=item.sortID"
            :class="selectSortID==item.sortID?'spanSelected':''"
          >{{item.sortName}}</span>
        </div>
        <div class="dailog-foot">
          <div class="dailog-button" @click="closeDialog">取消</div>
          <div class="dailog-button" style="margin-left:20px" @click="getContentBySort">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTrainList } from "@/api/train.js";
import { getSort } from "@/api/doctor.js";
export default {
  data() {
    return {
      noData: "",
      trainList: [],
      sortList: [],
      isShowDialog: false,
      selectSortID: 0,
      PageIndex: 1,
      PageSize: 10
    };
  },
  watch: {
    trainList(newVal, oldVal) {
      if (newVal == oldVal) {
        this.noData = "没有更多数据";
      }
    }
  },
  mounted() {
    this.getTrainData();
    this.getSortList();
  },
  methods: {
    getTrainData() {
      let params = {
        Sort: this.selectSortID,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      };
      getTrainList(params).then(res => {
        if (res.data.success) {
          if (res.data.data) {
            let data = res.data.data;
            data.forEach(item => {
              if (this.trainList.indexOf(item) < 0) {
                this.trainList.push(item);
              }
            });
          }
        }
      });
    },
    getTrainContent(id) {
      this.$router.push({
        name: "trainContent",
        query: {
          ID: id
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
    closeDialog() {
      this.isShowDialog = false;
      this.selectSortID = 0;
    },
    getContentBySort() {
      this.isShowDialog = false;
      this.PageIndex = 1;
      this.PageSize = 10;
      this.trainList = [];
      this.getTrainData();
    },
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
        });
        return;
      }
      let self = this;
      let start = this.trainList.length;

      setTimeout(() => {
        this.PageIndex++;
        this.getTrainData();
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
        this.trainList = [];
        this.getTrainData();
        this.$refs.myscroller.finishPullToRefresh();
      }, 500);
    }
  }
};
</script>

