<template>
  <!-- s  -->
  <section class="call-video">
    <div class="video-container">
      <div class="container-info">
        <div class="info-portrait">
          <img src="../../../assets/images/master.png">
        </div>
        <div class="info-detail">
          <p class="info-account font-39 color-white">17730127131</p>
          <p class="info-waiting font-30 color-white">等待对方接听...</p>
        </div>
      </div>
      <div class="container-myself" id="video-container"></div>
      <div class="container-remoteContainer" id="vider-remoteContainer"></div>
      <div class="container-footer bg-white">
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item bg-red color-white" @click="cancelVideo">
          <i class="iconfont icon-video"></i>
        </div>
      </div>
    </div>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'CallVideoComponent',
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
    cancelVideo () {
      this.$emit('CANCEL_VIDEO_EVENT')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./call-video.scss";
</style>
