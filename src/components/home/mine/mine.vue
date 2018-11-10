<template>
  <!-- s 我的 -->
  <section class="mine">
    <div class="mine-information padding-horizontal-24 margin-bottom-21">
      <div class="information-detail padding-vertical-15">
        <div class="detail-portrait" @click="gotoPage('personal-info')">
          <img :src="personalInfo.avatar">
        </div>
        <div class="detail-content">
          <p class="font-36 color-deep-black">{{personalInfo.nick}}</p>
          <p class="font-24 color-light-black">借条ID: {{personalInfo.account}}</p>
        </div>
      </div>
      <div class="information-operation">
        <p class="operation-item" @click="gotoPage('news')">
          <i class="iconfont icon-xiaoxi font-30 margin-right-12"></i>
          <span class="font-27">消息</span>
        </p>
        <p class="operation-item" @click="gotoPage('settings')">
          <i class="iconfont icon-shezhi font-30 margin-right-12"></i>
          <span class="font-27">设置</span>
        </p>
      </div>
    </div>
    <div class="mine-balance padding-horizontal-30 margin-bottom-21">
      <div class="balance-count">
        <p class="count-content" @click="gotoPage('account-balance')">
          <span class="color-deep-black font-27">我的总资产（元）</span>
          <span class="color-deep-black font-60">{{balance.Balance}}</span>
        </p>
        <i class="iconfont icon-arrow-right color-grey"></i>
      </div>
      <div class="balance-detail">
        <div class="detail-item border-radius-12" @click="gotoPage('borrow-list')">
          <div class="item-bg">
            <img src="../../../assets/images/borrow-detail.png">
          </div>
          <div class="item-content">
            <p class="font-30 color-white">借入</p>
            <p class="font-36 color-white">{{balance.BorrowAmount}}</p>
          </div>
        </div>
        <div class="detail-item border-radius-12" @click="gotoPage('lend-list')">
          <div class="item-bg">
            <img src="../../../assets/images/lend-detail.png">
          </div>
          <div class="item-content">
            <p class="font-30 color-white">借出</p>
            <p class="font-36 color-white">{{balance.LendAmount}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-billboard-list bg-white">
      <BillboardComponent class="list-item padding-right-30" :billboard="item" v-for="(item, index) in billboard" :key="index" @OPERATION_EVENT="gotoPage"></BillboardComponent>
    </div>
    <!-- <TabComponent></TabComponent> -->
  </section>
  <!-- e 我的 -->
</template>

<script>
// include dependence
import Chat from '../../../class/Chat.class.js'
import Http from '../../../class/Http.class.js'
import Router from '../../../class/Router.class.js'
import Storage from '../../../class/Storage.class.js'
import BillboardComponent from '../../../module/billboard/billboard.vue'
export default {
  name: 'MineComponent',
  data () {
    return {
      name: Storage.name,
      account: Storage.phone,
      balance: {},
      personalInfo: {},
      // start params
      'billboard': [
        {
          key: '收还款计划',
          icon: 'arrow-right',
          svg: 'shouhuankuanjihua',
          target: 'account-statistic',
          border: true
        },
        {
          key: '我的银行卡',
          icon: 'arrow-right',
          svg: 'wodeyinhangqia',
          target: 'my-bank-card',
          border: true
        },
        {
          key: '常见问题',
          icon: 'arrow-right',
          svg: 'changjianwenti',
          target: 'familar-question',
          border: true
        },
        {
          key: '在线客服',
          icon: 'arrow-right',
          svg: 'zaixiankefu1',
          border: true
        },
        {
          key: '授信',
          svg: 'shouxin',
          icon: 'arrow-right',
          target: 'credit',
          border: true
        },
        {
          key: '意见反馈',
          svg: 'yijianfankui',
          icon: 'arrow-right',
          target: 'feedback',
          border: true
        }
      ]
      // end params
    }
  },
  components: {
    BillboardComponent
    // TabComponent
    // include components
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      console.log(Storage.chat)
      Chat.getUserInfo(Storage.chat.id).success(data => {
        this.personalInfo = data
        Storage.userInfo = data
      })
      Http.send({
        url: 'PersonalCenter',
        data: {
          token: Storage.token,
          phone: Storage.phone,
          maxNumber: 100
        }
      }).success(data => {
        this.balance = data
      }).fail(data => {
        Storage.error = {
          modal: true,
          message: 'xxxxxx'
        }
      })
    },
    gotoPage (page) {
      Router.push(page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./mine.scss";
</style>
