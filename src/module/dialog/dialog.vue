<template>
  <!-- s  -->
  <section class="dialog">
    <div class="dialog-container">
      <div class="container-content">
        <p class="content-text">{{dialog.title}}</p>
      </div>
      <div class="container-button">
        <div class="button-single" v-if="dialog.type == 'single'" @click="sure">
          <span>确认</span>
        </div>
        <div class="button-double" v-if="dialog.type == 'double'">
          <div class="double-btn" @click="cancle">取消</div>
          <div class="double-btn" @click="sure">确认</div>
        </div>
      </div>
    </div>
  </section>
  <!-- e  -->
</template>

<script>
export default {
  name: 'DialogComponent',
  props: ['dialog'],
  data () {
    return {}
  },
  methods: {
    cancle () {
      this.$emit('CANCLE_EVENT')
    },
    sure () {
      this.$emit('SURE_EVENT')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./dialog.scss";
</style>
