<template>
  <!-- s 意见反馈 -->
  <section class="feedback">
    <TitleComponent :title="title" @BACK_EVENT="backPage"></TitleComponent>
    <div class="feedback-title bg-white border-bottom-1">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bitian"></use>
      </svg>
      <!-- <i class="iconfont icon-bitian font-30"></i> -->
      <p class="font-27 color-black">请描述你遇到的问题</p>
    </div>
    <div class="feedback-advice bg-white">
      <div class="advice-opinion">
        <textarea class="opinion-input font-27 color-black" id="opinion-input" v-model="opinion" maxlength="200" name="opinion-input" placeholder="描述你的问题"></textarea>
        <div class="input-number font-27 color-light-black"><span>{{opinion.length}}/200</span></div>
      </div>
    </div>
    <div class="feedback-contact-way bg-white">
      <input class="font-27 color-black padding-left-30" v-model="contentWay" type="text" placeholder="手机号/邮箱（选填，方便我们联系您）">
    </div>
    <div class="feedback-button padding-horizontal-30">
      <ButtonComponent :button="button" @SUBMIT_EVENT="feedbackSubmit"></ButtonComponent>
    </div>
  </section>
  <!-- e 意见反馈 -->
</template>

<script>
// include dependence
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import ButtonComponent from '../../module/button/button.vue'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'FeedbackComponent',
  data () {
    return {
      opinion: '',
      contentWay: '',
      // start params
      'button': {
        default: [{
          type: 'primary',
          text: '提交'
        }]
      },
      'title': {
        contentText: '意见反馈'
      }
      // end params
    }
  },
  components: {
    ButtonComponent,
    TitleComponent
    // include components
  },
  methods: {
    backPage () {},
    feedbackSubmit () {
      if (!this.opinion) return
      if (!Check.phone(this.contentWay)) return
      Http.send({
        url: 'Opinion',
        data: {
          token: Storage.token,
          contactWay: this.contentWay,
          opinion: this.opinion
        }
      }).success(data => {
        console.log(data)
      }).fail(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./feedback.scss";
</style>
