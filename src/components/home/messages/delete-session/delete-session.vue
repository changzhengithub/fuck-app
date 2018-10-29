<template>
  <!-- s  -->
  <section class="delete-session bg-white">
    <div class="session-title padding-horizontal-30"><span>长征</span></div>
    <div class="session-switch padding-horizontal-30" @click="deleteSession"><span class="font-30 color-black">删除该聊天</span></div>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'DeleteSessionComponent',
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
    deleteSession () {
      this.$emit('DELETE_SESSION_EVENT')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./delete-session.scss";
</style>
