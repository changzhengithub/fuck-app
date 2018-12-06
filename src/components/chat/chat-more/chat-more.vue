<template>
  <!-- s  -->
  <section class="chat-more">
    <div class="more-item" @click="openPictureModal">
      <div class="item-icon bg-white">
        <i class="iconfont icon-img font-51"></i>
      </div>
      <p class="font-24">图片</p>
    </div>
    <div class="more-item" @click="gotoCall('videoCall')">
      <div class="item-icon bg-white">
        <i class="iconfont icon-video font-51"></i>
      </div>
      <p class="font-24">视频通话</p>
    </div>
    <div class="more-item" @click="gotoCall('voiceCall')">
      <div class="item-icon bg-white">
        <i class="iconfont icon-phone1 font-51"></i>
      </div>
      <p class="font-24">语音通话</p>
    </div>
    <div class="more-item" @click="gotoBorrow(1)">
      <div class="item-icon bg-white">
        <i class="iconfont icon-jie font-51"></i>
      </div>
      <p class="font-24">我要借</p>
    </div>
    <div class="more-item" @click="gotoBorrow(2)">
      <div class="item-icon bg-white">
        <i class="iconfont icon-qian font-51"></i>
      </div>
      <p class="font-24">打欠条</p>
    </div>
    <div class="more-item" @click="gotoTransfer('friend-transfer')">
      <div class="item-icon bg-white">
        <i class="iconfont icon-transfer font-51"></i>
      </div>
      <p class="font-24">转账</p>
    </div>
    <div class="more-item" @click="gotoPage('credit-report')">
      <div class="item-icon bg-white">
        <i class="iconfont icon-credit font-51"></i>
      </div>
      <p class="font-24">信用报告</p>
    </div>
    <div class="more-item" @click="gotoPage('select-friend')">
      <div class="item-icon bg-white">
        <i class="iconfont icon-Id font-51"></i>
      </div>
      <p class="font-24">个人名片</p>
    </div>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'ChatMoreComponent',
  data () {
    return {
      // start params
      // end params
    }
  },
  components: {
    // include components
  },
  methods: {
    openPictureModal () {
      this.$emit('OPEN_PICTRUE_MODAL_EVENT')
    },
    gotoCall (type) {
      this.$emit('GOTO_CALL_EVENT', type)
    },
    gotoBorrow (type) {
      this.$emit('GOTO_BORROW_EVENT', type)
    },
    gotoTransfer (page) {
      this.$emit('GOTO_TRANSFER_EVENT', page)
    },
    gotoPage (page) {
      this.$emit('GOTO_PAGE_EVENT', page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./chat-more.scss";
</style>
