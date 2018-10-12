<template>
  <!-- s  -->
  <section class="send-card bg-white padding-top-21">
    <div class="card-title padding-horizontal-30"><span class="font-30 color-black">发送给{{cardInfo.target}}</span></div>
    <div class="content-item padding-horizontal-30 border-bottom-1">
      <div class="item-portrait">
        <img :src="cardInfo.money">
      </div>
      <div class="item-detail padding-horizontal-30">
        <p class="font-27 color-black">{{cardInfo.title}}</p>
        <p class="font-21 color-deep-grey"><span>借条ID：</span><span>{{userid}}</span></p>
      </div>
    </div>
    <div class="card-buttons">
      <button class="button" @click="cancel"><div class="font-27 color-black">取消</div></button>
      <button class="button" @click="send"><div class="font-27 color-blue">发送</div></button>
    </div>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'SendCardComponent',
  props: ['cardInfo', 'userid'],
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
    cancel () {
      this.$emit('CANCEL_EVENT')
    },
    send () {
      this.$emit('SEND_EVENT')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./send-card.scss";
</style>
