<template>
  <!-- s  -->
  <section class="call-voice">
    <div class="voice-top">
      <div class="top-switch" v-if="isWebRTCConnect">
        <div class="switch-video color-white font-30">
          <i class="iconfont icon-xiaolian"></i>
          <span>切换视频</span>
        </div>
      </div>
      <div class="top-info">
        <div class="info-portrait">
          <img src="../../../assets/images/master.png">
        </div>
        <p class="info-account font-39 color-white">17730127131</p>
        <div class="info-accept" v-if="isWebRTCConnect">
          <p class="accept-time font-39 color-white">{{netcallDurationText}}</p>
          <p class="accept-network font-33 color-white">网络: 111</p>
        </div>
        <p class="info-waiting font-30 color-white" v-if="!isWebRTCConnect">等待对方接听...</p>
      </div>
    </div>
    <div class="voice-switch">
      <button class="switch-item">
        <div class="item-btn">
          <i class="iconfont icon-xiaolian"></i>
          <span>静音</span>
        </div>
      </button>
      <button class="switch-item">
        <div class="item-btn">
          <i class="iconfont icon-xiaolian"></i>
          <span>扬声器</span>
        </div>
      </button>
      <button class="switch-item">
        <div class="item-btn">
          <i class="iconfont icon-xiaolian"></i>
          <span>录制</span>
        </div>
      </button>
    </div>
    <div class="voice-over" @click="cancelVoice">
      <span class="font-36 color-white">结束通话</span>
    </div>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'CallVoiceComponent',
  props: ['isWebRTCConnect', 'netcallDurationText'],
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
    cancelVoice () {
      this.$emit('CANCEL_VOICE_EVENT')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./call-voice.scss";
</style>
