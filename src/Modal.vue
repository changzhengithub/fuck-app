<template>
  <div id="modal">
    <ModalsComponent v-if="show">
      <TipComponent class="modal-tip bg-white border-radius-12" :tip="tip"></TipComponent>
      <!-- <ButtonComponent class="modal-btn" :button="button" @SUBMIT_EVENT="hide"></ButtonComponent> -->
    </ModalsComponent>
  </div>
</template>

<script>
import 'vuex'
import ModalsComponent from '../src/module/modal/modal.vue'
import TipComponent from '../src/module/tip/tip.vue'
import ButtonComponent from '../src/module/button/button.vue'
export default {
  name: 'Modal',
  data () {
    return {
      show: false,
      timer: null,
      tip: {
        type: 'center',
        content: ''
      },
      button: {
        default: [{
          type: 'full',
          text: '确认'
        }]
      }
    }
  },
  watch: {
    '$store.state.error': function (error) {
      clearTimeout(this.timer)
      this.show = error.modal
      this.tip.content = error.message
      this.timer = setTimeout(() => {
        this.$store.commit('saveError', {
          modal: false,
          message: ''
        })
      }, 1000)
    }
  },
  components: {
    ModalsComponent,
    TipComponent,
    ButtonComponent
    // include components
  },
  methods: {
    hide () {
      this.$store.commit('saveError', {
        modal: false,
        message: ''
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./Modal.scss";
</style>
