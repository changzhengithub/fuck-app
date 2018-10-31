<template>
  <!-- s 活跃出借人 -->
  <section class="active-lender padding-top-126 bg-white">
    <TitleComponent :title="title"></TitleComponent>
    <ul class="lender-list">
      <li class="list-item padding-horizontal-30 border-bottom-1" v-for="(item, index) in loaners" :key="index" @click="gotoBorrow(1, item)">
        <div class="item-content">
          <div class="content-sign active-sign border-radius-12 color-white">
            <img :src="item.portrait">
          </div>
          <div class="content-message">
            <div class="content-title">
              <p class="font-30 color-black">{{item.Name}}</p>
            </div>
            <div class="font-27 color-light-grey">
              <span class="font-27 color-black">{{t2}}</span>
              <span class="font-24 color-blue">{{item.Quantity}}笔</span>
            </div>
          </div>
        </div>
        <p class="item-tip font-24 color-light-grey">{{item.Signature}}</p>
      </li>
    </ul>
  </section>
  <!-- e 活跃出借人 -->
</template>

<script>
// include dependence
import Chat from '../../class/Chat.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'ActiveLenderComponent',
  data () {
    return {
      t2: '',
      loaners: [],
      imgList: [],
      // start params
      'title': {
        contentText: '活跃出借人'
      }
      // end params
    }
  },
  components: {
    TitleComponent
    // include components
  },
  mounted () {
    this.init()
    Storage.publishObject = null
  },
  methods: {
    init () {
      let accounts = []
      let count = -1
      Http.send({
        url: 'LendMemberList',
        data: {
          token: Storage.token,
          phone: Storage.phone,
          type: 1
        }
      }).success(data => {
        this.loaners = data.list
        data.list.forEach((item) => {
          accounts.push(item.UserPhone)
        })
        for (let i = 0; i < accounts.length; i += 20) {
          count++
          this.getUserInfo(accounts.slice(i, i + 20), count)
        }
        this.t2 = data.t2
      }).fail(data => {
      })
    },
    getUserInfo (accounts, index) {
      Chat.getUserInfo(accounts).success(data => {
        data.forEach((item, i) => {
          this.loaners[index * 20 + i].portrait = item.avatar ? item.avatar : require('../../assets/images/master.png')
        })
        this.loaners = [...this.loaners]
      })
    },
    gotoBorrow (type, item) {
      Storage.publishObject = {
        imAccid: item.Accid,
        Name: item.Name,
        Phone: item.UserPhone
      }
      Storage.borrowType = type
      Router.push('iou-template')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "./active-lender.scss";
</style>
