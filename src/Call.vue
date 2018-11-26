<template>
  <div id="call"></div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {}
  },
  watch: {
    '$store.state.message' (message) {
      console.log('收到消息哈哈哈哈哈哈哈')
    }
  },
  components: {},
  methods: {}
}
</script>

<style lang="sass" scoped>
@import "./Call.scss";
</style>
