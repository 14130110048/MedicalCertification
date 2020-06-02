<template>
  <div id="trainContent" v-cloak>
    <div class="content" v-if="content">
      <div class="title">{{trainInfo.trainTitle}}</div>
      <div class="trainContent" v-html='trainInfo.trainContent'></div>
      <div class="dati">
        <div class="weui-btn weui-btn_primary" @click="getExam">开始答题</div>
      </div>
    </div>
    <div v-else>链接已使用过</div>
  </div>
</template>

<script>
import { getTrainContent } from "@/api/train.js";
export default {
  data() {
    return {
      trainID: null,
      trainInfo: {},
      accessID: null,
      content: true
    };
  },
  mounted() {
    this.trainID = this.$route.query.ID ? this.$route.query.ID : null;
    this.accessID = this.$route.query.accessID
      ? this.$route.query.accessID
      : null;
    this.getContent();
  },
  methods: {
    getContent() {
      let params = {
        TrainID: this.trainID,
        AccessID: this.accessID
      };
      getTrainContent(params).then(res => {
        if (res.data.success) {
          this.trainInfo = res.data.data;
          this.trainID = res.data.data.id;
        } else {
          this.content = false;
        }
      });
    },
    getExam() {
      this.$router.push({
        name: "exam",
        query: {
          trainID: this.trainID,
          accessID: this.accessID
        }
      });
    }
  }
};
</script>

