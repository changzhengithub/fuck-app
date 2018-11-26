<template>
  <!-- s  -->
  <section class="call-inform">
    <div class="voice-info" v-if="isCallType">
      <div class="info-portrait">
        <img src="../../../assets/images/master.png">
      </div>
      <p class="info-account font-39 color-white">17730127131</p>
      <p class="info-waiting font-30 color-white">请求通话</p>
    </div>
    <div class="inform-video" v-if="!isCallType">
      <div class="video-info">
        <div class="info-portrait">
          <img src="../../../assets/images/master.png">
        </div>
        <div class="info-detail">
          <p class="info-account font-39 color-white">17730127131</p>
          <p class="info-waiting font-30 color-white">等待对方接听...</p>
        </div>
      </div>
    </div>
    <div class="inform-switch">
      <div class="switch-item bg-red" @click="reject">
        <span class="font-36 color-white">拒绝</span>
      </div>
      <div class="switch-item bg-blue" @click="accept">
        <span class="font-36 color-white">接受</span>
      </div>
    </div>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'CallInformComponent',
  props: ['isCallType'],
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
    accept () {
      this.$emit('ACCEPT_EVENT')
    },
    reject () {
      this.$emit('REJECT_EVENT')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./call-inform.scss";
</style>
