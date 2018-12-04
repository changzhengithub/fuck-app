<template>
  <!-- s  -->
  <section class="call-video">
    <div class="video-wait" v-if="waitSwitchVideo">
      <p class="font-39 color-white">等待对方接听</p>
    </div>
    <div class="video-info" v-if="!isWebRTCConnect">
      <div class="info-portrait">
        <img src="../../assets/images/master.png">
      </div>
      <div class="info-detail">
        <p class="info-account font-39 color-white">17730127131</p>
        <p class="info-waiting font-30 color-white">等待对方接听...</p>
      </div>
    </div>
    <div class="video-switch font-33 color-white" v-if="isWebRTCConnect" @click="switchVoice">
      <i class="iconfont icon-xiaolian"></i>
      <span>切换音频</span>
    </div>
    <div class="video-time font-33 color-white" v-if="isWebRTCConnect"><span>{{netcallDurationText}}</span></div>
    <div :class="isPlay ? 'video-remoteContainer' : 'video-myself'" id="video-container" @click="updataLocalSize"></div>
    <div :class="isRemotePlay ? 'video-remoteContainer' : 'video-myself'" id="video-remoteContainer" @click="updataRemoteSize"></div>
    <div class="video-footer bg-white">
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
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'CallVideoComponent',
  props: ['isWebRTCConnect', 'netcallDurationText', 'waitSwitchVideo'],
  data () {
    return {
      isPlay: false,
      isRemotePlay: true,
      remoteWidth: 0,
      remoteHeight: 0,
      localWidth: 0,
      localHeight: 0
    }
  },
  mounted () {
    this.getVoideSize()
  },
  methods: {
    getVoideSize () {
      this.remoteWidth = document.getElementById('video-remoteContainer').offsetWidth
      this.remoteHeight = document.getElementById('video-remoteContainer').offsetHeight
      this.localWidth = document.getElementById('video-container').offsetWidth
      this.localHeight = document.getElementById('video-container').offsetHeight
      this.$emit('REMOTE_EVENT', this.remoteWidth, this.remoteHeight, this.localWidth, this.localHeight)
    },
    cancelVideo () {
      this.$emit('CANCEL_VIDEO_EVENT')
    },
    switchVoice () {
      this.$emit('SWITCH_VOICE_EVENT')
    },
    updataLocalSize () {
      if (this.isPlay) return
      this.isPlay = true
      this.isRemotePlay = false
      this.$emit('UPDATA_LOCAL_EVENT')
    },
    updataRemoteSize () {
      if (this.isRemotePlay) return
      this.isRemotePlay = true
      this.isPlay = false
      this.$emit('UPDATA_REMOTE_EVENT')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./call-video.scss";
</style>
