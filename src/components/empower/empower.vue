<template>
  <!-- s 登录 -->
  <section class="empower">
    <div class="empower-header">
      <img src="../../assets/images/logo2.png">
    </div>
    <div class="empower-tab">
      <div class="tab-nav">
        <div class="nav-item" :class="{'badge-active': switcher}" @click="switchCode"><span>验证码登录</span></div>
        <div class="nav-item" :class="{'badge-active': !switcher}" @click="switchPassword"><span>密码登录</span></div>
      </div>
      <div class="tab-form">
        <div class="form-item form-phone">
          <input type="text" v-model="phone" maxlength="11" placeholder="输入手机号">
        </div>
        <div class="form-item form-code" v-if="switcher">
          <input type="text" v-model="code" maxlength="6" placeholder="请输入验证码">
          <button class="button font-27 color-blue bg-white" @click="getCode" :disabled="codeDisabled"><div>{{getCodeText}}</div></button>
        </div>
        <div class="form-item form-password" v-if="!switcher">
          <input type="password" v-model="password" placeholder="输入密码">
          <i class="iconfont icon-cong" v-if="password" @click="clearPassword"></i>
        </div>
        <div class="form-button">
          <ButtonComponent :button="button" @SUBMIT_EVENT="login"></ButtonComponent>
        </div>
        <div class="form-forget" v-if="!switcher"><span @click="gotoPage('forget-password')">忘记密码</span></div>
      </div>
    </div>
  </section>
  <!-- e 登录 -->
</template>

<script>
// include dependence
import Account from '../../class/Account.class.js'
import Chat from '../../class/Chat.class.js'
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import ButtonComponent from '../../module/button/button.vue'
export default {
  name: 'EmpowerComponent',
  data () {
    return {
      phone: '13955131374',
      password: '123456',
      code: '',
      getCodeText: '获取验证码',
      switcher: true,
      codeDisabled: false,
      // start params
      'button': {
        default: [{
          type: 'primary',
          text: '提交'
        }]
      }
      // end params
    }
  },
  components: {
    ButtonComponent
    // include components
  },
  created () {
    Storage.clear()
  },
  methods: {
    switchCode () {
      this.switcher = true
    },
    switchPassword () {
      this.switcher = false
    },
    clearPassword () {
      this.password = ''
    },
    waitOneMinute () {
      this.codeDisabled = true
      this.getCodeText = '60秒后重发'
      let time = 60
      let animation = setInterval(() => {
        time--
        if (time > 0) {
          this.getCodeText = `${time}秒后重发`
        } else {
          this.getCodeText = '发送验证码'
          clearInterval(animation)
          this.codeDisabled = false
        }
      }, 1000)
    },
    getCode () {
      if (!Check.phone(this.phone)) return // phone is not correct
      this.waitOneMinute()
      Http.send({
        url: 'SendSMS',
        data: {
          phone: this.phone,
          type: 6
        }
      }).success(data => {
      }).fail(data => {
      })
    },
    login () {
      let url = null
      let data = null
      if (!Check.phone(this.phone)) return // phone is not correct
      if (this.switcher && !Check.code(this.code)) return // code is not correct
      if (!this.switcher && !Check.password(this.password)) return // password is not correct
      if (this.switcher) {
        url = 'UserSmsLogin'
        data = {
          deviceId: '',
          phone: this.phone,
          code: this.code,
          deviceModel: '',
          deviceName: '',
          operator: '',
          connectionType: '',
          lat: '',
          lng: '',
          address: ''
        }
      } else {
        url = 'UserLogin'
        data = {
          deviceId: '',
          phone: this.phone,
          password: this.password,
          deviceModel: '',
          deviceName: '',
          operator: '',
          connectionType: '',
          lat: '',
          lng: '',
          address: ''
        }
      }
      Http.send({
        url: url,
        data: data
      }).success(data => {
        console.log(data)
        Account.info = data
        Chat.key = data
        Storage.token = data.Token
        Storage.phone = this.phone
        Storage.name = data.Name
        Router.push('home')
      }).fail(data => {
      })
    },
    gotoPage (page) {
      Router.push(page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./empower.scss";
</style>
