<template>
  <!-- s 转账 -->
  <section class="friend-transfer">
    <TitleComponent :title="title" @OTHER_EVENT="gotoPage"></TitleComponent>
    <div class="transfer-tip">
      <div class="tip-icon">
        <i class="iconfont icon-cong"></i>
      </div>
      <p class="tip-text" id="tip">警惕"扫码退款"转账到安全账户"等骗术",请保护好你的资金安全</p>
    </div>
    <div class="transfer-object bg-white">
      <div class="object-portrait">
        <img :src="personalInfo.avatar">
      </div>
      <p class="font-36 color-black">{{personalInfo.nick}}</p>
    </div>
    <div class="transfer-content bg-white">
      <div class="content-amount">
        <i class="iconfont icon-cong color-blue"></i>
        <span class="font-30 color-black">转账金额</span>
      </div>
      <div class="content-input border-bottom-1">
        <InputsComponent :inputs="amountInput" @GET_INPUT_TEXT_EVENT="getAmountInputText"></InputsComponent>
      </div>
      <div class="content-balance font-27 color-light-black">
        <span>可用余额</span>
        <span>88.88</span>
      </div>
    </div>
    <div class="transfer-remark bg-white">
      <p class="font-30 color-black">备注</p>
      <input type="text" maxlength="20" placeholder="20字以内">
    </div>
    <div class="transfer-button padding-horizontal-30">
      <ButtonComponent :button="button" @SUBMIT_EVENT="transferSubmit"></ButtonComponent>
    </div>
  </section>
  <!-- e 转账 -->
</template>

<script>
// include dependence
import Chat from '../../class/Chat.class.js'
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import ButtonComponent from '../../module/button/button.vue'
import InputsComponent from '../../module/inputs/inputs.vue'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'FriendTransferComponent',
  data () {
    return {
      personalInfo: {},
      amountNumber: '',
      amountInput: {
        type: 'icon',
        leftIcon: 'cong',
        placeholder: '请输入金额',
        style: 'number'
      },
      // start params
      'button': {
        default: [{
          type: 'primary',
          text: '确定转账'
        }]
      },
      'title': {
        contentText: '转账',
        rightText: '转账记录'
      }
      // end params
    }
  },
  components: {
    InputsComponent,
    TitleComponent,
    ButtonComponent
    // include components
  },
  mounted () {
    this.scroll()
  },
  created () {
    this.personalInfo = Storage.userInfo
  },
  methods: {
    gotoPage () {},
    getAmountInputText (text) {
      this.amountNumber = text
    },
    scroll () {
      var tip = document.getElementById('tip')
      var left = tip.offsetLeft
      setInterval(() => {
        var offset = tip.offsetLeft
        var speed = 1
        tip.style.left = offset - speed + 'px'
        if (tip.offsetLeft <= (left - tip.offsetWidth)) {
          tip.style.left = (tip.offsetWidth + left - 30) + 'px'
        }
      }, 8)
    },
    transferSubmit () {
      if (!Check.money(this.amountNumber)) return
      let content = {
        target: Chat.target.id,
        money: this.amountNumber,
        title: '转账'
      }
      Http.send({
        url: 'url',
        data: {}
      }).success(data => {
        Chat.transferAccount(content).success(data => {
          console.log(data)
          Router.push('chat')
        })
      }).fail(data => {
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./friend-transfer.scss";
</style>
