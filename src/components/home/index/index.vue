<template>
  <!-- s  首页-->
  <section class="index">
    <header class="index-header">
      <div class="swiper-container banner" id="banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
            <img :src="item.url">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="header-list padding-horizontal-21">
        <div class="list-search padding-horizontal-30">
          <i class="iconfont icon-sousuo font-30 color-white"></i>
          <input type="text" placeholder="搜索你可能认识的朋友">
        </div>
        <div class="list-item" @click="gotoPage('friends')">
          <i class="iconfont icon-haoyou1"></i>
          <p>联系人</p>
        </div>
        <div class="list-item" @click="gotoPage('add-friend')">
          <i class="iconfont icon-tianjiatupianjiahao"></i>
          <p>加好友</p>
        </div>
      </div>
    </header>
    <nav class="index-nav">
      <div class="nav-item" @click="gotoPage('find-lender')">
        <i class="iconfont icon-zhaochujieren"></i>
        <p>找出借人</p>
      </div>
      <div class="nav-item">
        <i class="iconfont icon-daikuanchaoshi"></i>
        <p>贷款超市</p>
      </div>
      <div class="nav-item" @click="gotoPage('iou-center')">
        <i class="iconfont icon-jietiaozhongxin"></i>
        <p>借条中心</p>
      </div>
      <div class="nav-item" @click="gotoPage('credit-query')">
        <i class="iconfont icon-shixinchaxun"></i>
        <p>失信查询</p>
      </div>
      <div class="nav-item">
        <i class="iconfont icon-zhongcaijindu"></i>
        <p>仲裁进度</p>
      </div>
      <div class="nav-item"  @click="gotoPage('collection-schedule')">
        <i class="iconfont icon-zaixiankefu"></i>
        <p>催收进度</p>
      </div>
      <div class="nav-item" @click="gotoPage('complain')">
        <i class="iconfont icon-woyaotousu"></i>
        <p>我要投诉</p>
      </div>
      <div class="nav-item">
        <i class="iconfont icon-cuishoubaozhang"></i>
        <p>催收保障</p>
      </div>
    </nav>
    <div class="index-message">
      <div class="message-left">
        <img src="../../../assets/images/hot.png">
      </div>
      <div class="message-right">
        <div class="swiper-container broad" id="broad">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in broadList" :key="index">
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-activity">
      <div class="activity-find">
        <img src="../../../assets/images/find.png">
      </div>
      <div class="activity-invite">
        <img src="../../../assets/images/ivint.png">
      </div>
    </div>
    <!-- <TabComponent></TabComponent> -->
  </section>
  <!-- e  首页-->
</template>

<script>
import Swiper from 'Swiper'
// include dependence
import Http from '../../../class/Http.class.js'
import Router from '../../../class/Router.class.js'
import Storage from '../../../class/Storage.class.js'
export default {
  name: 'IndexComponent',
  data () {
    return {
      bannerSwiper: null,
      broadSwiper: null,
      bannerList: [],
      broadList: [],
      share: {}
      // start    params
      // end params
    }
  },
  components: {
    // TabComponent
  },
  created () {
    Http.send({
      url: 'Index',
      data: {
        token: Storage.token,
        userPhone: Storage.phone
      }
    }).success(data => {
      this.bannerList = data.bannerList
      this.broadList = data.broadList
      this.share = data.share
      var _this = this
      _this.$nextTick(() => {
        this.initBannerSwiper()
        this.initBroadSwiper()
      })
    }).fail(data => {
      console.log(data)
    })
  },
  methods: {
    gotoPage (page) {
      Router.push(page)
    },
    // banner轮播图
    initBannerSwiper () {
      if (this.bannerSwiper !== null) return
      this.bannerSwiper = new Swiper('.banner', {
        loop: true,
        speed: 900,
        onlyExternal: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        }
      })
      // this.bannerSwiper.detachEvents()
    },
    // broad 轮播图
    initBroadSwiper () {
      if (this.broadSwiper !== null) return
      this.broadSwiper = new Swiper('.broad', {
        loop: true,
        speed: 2000,
        direction: 'vertical',
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true
      })
      this.broadSwiper.detachEvents()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./index.scss";
</style>
