<template>
  <div id="home">
    <div class="main-box">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- 这部分放你要渲染的那些内容 -->
        <swiper-slide v-for="item in imgs" :key="item.ID">
          <img :src="item" alt />
        </swiper-slide>
        <!-- 这是轮播的小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="link">
        <div class="weui-btn weui-btn_primary" @click="createLink">生成链接</div>
      </div>
      <div class="link">
        <div class="weui-btn weui-btn_primary" @click="showDialog=true">检查奖励码</div>
      </div>
    </div>

    <!-- jian -->
    <div class="js_dialog" id="iosDialog1" v-if="showDialog">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">检查奖励码</strong>
        </div>
        <div class="code__hd">
          <label class="code-label">奖励码:</label>
          <input class="code" type="text" placeholder="请输入奖励码" v-model="rewardCode" />
          <div class="err" v-if="err"></div>
        </div>
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_default" @click="cancel">取消</a>
          <a class="weui-dialog__btn weui-dialog__btn_primary" @click="checkCode">确定</a>
        </div>
      </div>
    </div>

    <!-- jiangli -->
    <div class="dailog" v-if="isShowDialog">
      <div class="dailog-box">
        <div>
          <div class="close" @click="close"></div>
        </div>
        <div class="dailog-content">
          <span class="tip">恭喜您获得了</span>
          <span class="pass">{{reward.rewardContent}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, checkRewardCode } from "@/api/authorize.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      userInfo: {},
      rewardCode: "",
      showDialog: false,
      err: false,
      isShowDialog: false,
      reward: {},
      imgs: [
        require("../../assets/images/1.jpg"),
        require("../../assets/images/2.jpg"),
        require("../../assets/images/3.jpg"),
        require("../../assets/images/4.jpg")
      ],
      swiperOption: {
        loop: true,
        notNextTick: true,
        mousewheelControl: true,
        autoplayDisableOnInteraction: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        paginationClickable: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 3000
        },
        observer: true,
        speed: 300,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  watch: {
    rewardCode(val) {
      if (!val) {
        this.err = true;
        $(".err").html("请输入奖励码");
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(0, 0, false);
  },
  methods: {
    createLink() {
      this.$router.push({
        name: "doctorDetail"
      });
    },
    cancel() {
      this.showDialog = false;
      this.err = false;
    },
    checkCode() {
      if (this.rewardCode) {
        let params = {
          RewardCode: this.checkRewardCode
        };
        checkRewardCode(params)
          .then(res => {
            if (res.data.success) {
              if (rea.data.data.isUsed) {
                this.err = true;
                $(".err").html("该奖励码已被使用过");
              } else {
                this.showDialog = false;
                this.isShowDialog = true;
                this.reward = res.data.data;
              }
            } else {
              this.err = true;
              $(".err").html("请输入正确的奖励码");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.err = true;
        $(".err").html("请输入奖励码");
      }
    },
    close() {
      this.showDialog = false;
      this.isShowDialog = false;
    }
  }
};
</script>

