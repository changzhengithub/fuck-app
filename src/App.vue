<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './main.scss'
import Chat from './class/Chat.class.js'
export default {
  name: 'App',
  beforeCreate () {
    if (window.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
  },
  methods: {
    plusReady () {
      console.log(17840)
    }
  },
  watch: {
    '$store.state.chat': function (chat) {
      Chat.init()
    },
    '$store.state.sdk': function (sdk) {
      let chat = this.$store.state.chat
      if (sdk && chat !== null) Chat.init()
    }
  }
}
</script>

<style>
</style>
