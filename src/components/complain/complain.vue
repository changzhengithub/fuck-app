<template>
  <!-- s 我要投诉 -->
  <section class="complain padding-top-126 padding-bottom-39">
    <TitleComponent :title="title"></TitleComponent>
    <div class="complain-option padding-horizontal-30">
      <div class="option-item" :class="{active: setPurposeIndex === index}" v-for="(item, index) in optionList" :key="index" @click="setPurpose(index)">{{item}}</div>
    </div>
    <p class="complain-title font-27 padding-horizontal-30 bg-white border-bottom-1">请输入你要投诉的内容</p>
    <div class="complain-detail">
      <textarea name="detail" v-model="opinion" maxlength="200" placeholder="建议详细描述周转详情：如所借资金周转去向，以及资金流转的方向和还款计划等"></textarea>
      <div class="detail-num padding-horizontal-30">{{opinion.length}}/200</div>
    </div>
    <div class="complain-upload">
      <p class="upload-suggest font-27 bg-white padding-horizontal-30"><span>上传凭证</span><span class="color-light-grey">(建议添加相关问题截图，不超过3张)</span></p>
      <div class="upload-photo padding-horizontal-30">
        <div class="photo-add bg-white" v-if="!imgArr.length" @click="getImg">
          <i class="iconfont icon-tianjiatupianjiahao"></i>
        </div>
        <div class="photo-default" v-if="imgArr.length" v-for="(item, index) in imgArr" :key="index">
          <img src="">
        </div>
      </div>
    </div>
    <div class="complain-select bg-white padding-horizontal-30" @click="gotoPage('complain-object')">
      <span class="font-27 color-deep-grey">{{selectPhone ? selectPhone : '选择投诉对象'}}</span>
      <i class="iconfont icon-arrow-right font-27 color-light-grey"></i>
    </div>
    <div class="complain-button padding-horizontal-30">
      <ButtonComponent :button="button" @SUBMIT_EVENT="complainSubmit"></ButtonComponent>
    </div>
  </section>
  <!-- e 我要投诉 -->
</template>

<script>
// include dependence
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import ButtonComponent from '../../module/button/button.vue'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'ComplainComponent',
  data () {
    return {
      optionList: ['暴力催收', '态度恶劣', '信息辱骂', '泄露信息', '不消条据', '违规收费', '套路贷', '其他'],
      opinion: '',
      setPurposeIndex: 0,
      selectPhone: '',
      imgArr: [],
      // start params
      'button': {
        default: [{
          type: 'primary',
          text: '提交'
        }]
      },
      'title': {
        contentText: '我要投诉'
      }
      // end params
    }
  },
  components: {
    TitleComponent,
    ButtonComponent
    // include components
  },
  created () {
    this.selectPhone = Storage.complianPhone
    Storage.complianPhone = null
  },
  methods: {
    getImg () {},
    gotoPage (page) {
      Router.push(page)
    },
    setPurpose (index) {
      this.setPurposeIndex = index
    },
    complainSubmit () {
      if (!this.opinion) return
      if (!Check.phone(this.selectPhone)) return
      Http.send({
        url: 'Complain',
        data: {
          token: Storage.token,
          from_phone: Storage.phone,
          to_phone: Storage.complianPhone,
          tag: this.optionList[this.setPurposeIndex],
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
@import "./complain.scss";
</style>
