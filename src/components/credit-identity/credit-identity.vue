<template>
  <!-- s 身份认证 -->
  <section class="credit-identity padding-top-126">
    <TitleComponent :title="title"></TitleComponent>
    <!-- <div class="identity-upload">
      <div class="upload-title">
        <p class="font-24 color-light-grey">提交身份证信息，进行身份认证</p>
      </div>
      <div class="upload-content">
        <div class="content-item" @click="popUDFaceCheck">
          <div class="item-img">
            <img src="http://iph.href.lu/195x50">
          </div>
          <p class="font-27 color-deep-grey">身份证人像面</p>
        </div>
        <div class="content-item" @click="popUDFaceCheck">
          <div class="item-img">
            <img src="http://iph.href.lu/195x50">
          </div>
          <p class="font-27 color-deep-grey">身份证国徽面</p>
        </div>
        <div class="content-item" @click="popUDFaceCheck">
          <div class="item-img">
            <img src="http://iph.href.lu/195x50">
          </div>
          <p class="font-27 color-deep-grey">人脸识别</p>
        </div>
      </div>
    </div>
    <div class="identity-detail">
      <div class="detail-title">
        <p class="font-27 color-black">身份证信息</p>
      </div>
      <div class="detail-form">
        <div class="form-item">
          <span class="font-27 color-deep-grey">姓名</span>
          <input type="text" v-model="cardName" :disabled="inputDisabled">
        </div>
        <div class="form-item">
          <span class="font-27 color-deep-grey">身份证号</span>
          <input v-model="cardId" :disabled="inputDisabled">
        </div>
        <div class="form-item">
          <span class="font-27 color-deep-grey">有效期</span>
          <input type="text" v-model="indata" :disabled="inputDisabled">
        </div>
      </div>
    </div>
    <div class="identity-button">
      <ButtonComponent :button="button" @SUBMIT_EVENT="identitySubmit"></ButtonComponent>
    </div> -->
    <iframe class="identity-iframe" :src="url" @load="loadListener"></iframe>
  </section>
  <!-- e 身份认证 -->
</template>

<script>
import axios from 'axios'
// include dependence
import Account from '../../class/Account.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import ButtonComponent from '../../module/button/button.vue'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'CreditIdentityComponent',
  data () {
    return {
      url: '',
      index: 0,
      // start params
      'button': {
        default: [{
          type: 'primary',
          text: '立即提交'
        }]
      },
      'title': {
        contentText: '身份认证'
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
    this.init()
  },
  methods: {
    init () {
      axios({
        url: 'http://114.55.139.83:8088/udcredit/verify/index.c',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          phone: Storage.phone,
          bid: Storage.phone
        }
      }).then(response => {
        console.log(response)
        response = response.data
        if (response.resp_code) {
          this.show = true
          this.url = response.resp_desc
        }
      }).catch(() => {
      })
    },
    loadListener () {
      this.index++
      if (this.index > 2) {
        Http.send({
          url: 'CurrentStep',
          data: {
            token: Storage.token,
            phone: Storage.phone
          }
        }).success(data => {
          if (data.IsIdentityPass) {
            Router.push('add-contact')
            Account.id = data.IsIdentityPass
          } else {
            Router.back()
          }
        }).fail(data => {
          console.log(data)
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./credit-identity.scss";
</style>
