<template>
  <div id="exam">
    <div
      class="content"
      v-for="(item,index) in examList"
      :key="item.examID"
      :class="currentIndex==index?'':'contentHidden'"
    >
      <div class="xuhao">{{index+1}}/{{examList.length}}</div>
      <div class="exambox">
        {{index+1}}.{{item.examTile}}
        <div class="weui" v-for="item1 in item.options" :key="item1.optionID">
          <input
            type="checkbox"
            :value="item1.option"
            :name="item.examID"
            v-model="answerList[index].examAnswer"
          />
          <label>{{item1.option}}.{{item1.optionValue}}</label>
        </div>
        <div class="step">
          <div class="prevIndex" @click="prevIndex" v-if="currentIndex>0">上一题</div>
          <div class="nextIndex" @click="nextIndex" v-if="currentIndex<examList.length-1">下一题</div>
        </div>
      </div>
    </div>
    <div class="tijiao" v-if="currentIndex==examList.length-1">
      <div class="weui-btn weui-btn_primary" @click="showDialog=true">提交答案</div>
    </div>
    <!-- 确认提交 -->
    <div class="js_dialog" id="iosDialog1" v-if="showDialog">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">确认提交</strong>
        </div>
        <div class="weui-dialog__bd">请确认已做完所有题目并提交答案？</div>
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_default" @click="showDialog=false">取消</a>
          <a class="weui-dialog__btn weui-dialog__btn_primary" @click="submit">确定</a>
        </div>
      </div>
    </div>
    <!-- 得分情况 -->
    <div class="dailog" v-if="isShowDialog">
      <div class="dailog-box" :class="rewardInfo.rewardCode?'dailog-gongxi':'dailog-yihan'">
        <div>
          <div class="close" @click="closeScore"></div>
        </div>
        <div class="dailog-content">
          <span class="tip">您此次得分为：</span>
          <span class="score">{{rewardInfo.score}}分</span>
          <span class="isDoctor" v-if="!rewardInfo.isDoctor">检测到您并非医生，所以不能获得奖励</span>
          <span class="pass" v-else-if="rewardInfo.rewardCode&&rewardInfo.isDoctor">您通过了本次考试！</span>
          <span class="pass" v-else>您未通过本次考试！</span>
          <span
            class="isDoctor"
            v-if="rewardInfo.rewardCode&&rewardInfo.isDoctor"
          >您的兑奖码为：{{rewardInfo.rewardCode}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getExam, submitExam } from "@/api/train.js";
import trainContentVue from "./trainContent.vue";
export default {
  data() {
    return {
      trainID: "",
      accessID: "",
      examList: [],
      answerList: [],
      rewardInfo: {},
      currentIndex: 0,
      showDialog: false,
      isShowDialog: false
    };
  },
  mounted() {
    this.trainID = this.$route.query.trainID;
    this.accessID = this.$route.query.accessID;
    this.getExamContent();
  },
  methods: {
    getExamContent() {
      let params = {
        TrainID: this.trainID
      };
      this.examList = [];
      getExam(params).then(res => {
        if (res.data.success) {
          this.examList = res.data.data;
          this.examList.forEach(item => {
            let answer = {
              examID: item.examID,
              examAnswer: []
            };
            this.answerList.push(answer);
          });
        }
      });
    },
    submit() {
      let params = {};
      if (this.accessID) {
        params.accessID = this.accessID;
      }
      this.answerList.forEach(item => {
        item.examAnswer = item.examAnswer.jion(",");
      });
      params.trainID = this.trainID;
      params.answer = this.answerList;
      submitExam(params).then(res => {
        if (res.data.success) {
          this.rewardInfo = res.data.data;
          this.showDialog = false;
          this.isShowDialog = true;
        } else {
          if (res.data.msg == "IsAlreadySumit") {
            alert("您已经完成了考试，请勿重复提交");
          }
        }
      });
    },
    prevIndex() {
      this.currentIndex--;
    },
    nextIndex() {
      this.currentIndex++;
    },
    closeScore() {
      this.isShowDialog = false;
      this.window.opener = null;
      window.close();
    }
  }
};
</script>

