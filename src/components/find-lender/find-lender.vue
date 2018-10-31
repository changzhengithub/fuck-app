<template>
  <!-- s 寻找出借人 -->
  <section class="find-lender padding-top-126 bg-white">
    <TitleComponent :title="title" @OTHER_EVENT="confirm"></TitleComponent>
    <div class="lender padding-horizontal-30  border-bottom-1" v-for="(item, index) in loaners" :key="index">
      <div class="lender-content">
        <div class="content-sign active-sign border-radius-12 color-white">
          <img :src="item.portrait">
        </div>
        <div class="content-message padding-left-30">
          <div class="content-title">
            <p class="font-33 color-black">{{item.Name}}</p>
            <i class="iconfont icon-gouxuan color-light-grey font-30" :class="{'icon-jindu color-blue': item.checkFriend}"  @click="selected(item, index)"></i>
          </div>
          <div class="font-27 color-light-grey">
            <span class="font-27 color-black">{{t2}}</span>
            <span class="font-24 color-blue">{{item.Quantity}}笔</span>
          </div>
        </div>
      </div>
      <p class="lender-tip font-24 color-light-grey">{{item.Signature}}</p>
    </div>
  </section>
  <!-- e 寻找出借人 -->
</template>

<script>
// include dependence
import Chat from '../../class/Chat.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'FindLenderComponent',
  data () {
    return {
      t2: '',
      count: -1,
      pageLength: 0,
      loaners: [],
      // start params
      'title': {
        contentText: '寻找出借人',
        rightText: '确认'
      }
      // end params
    }
  },
  components: {
    TitleComponent
    // include components
  },
  created () {
    this.init()
    Storage.publishObject = null
  },
  methods: {
    init () {
      Http.send({
        url: 'LendMemberList',
        data: {
          token: Storage.token,
          phone: Storage.phone,
          type: 1
        }
      }).success(data => {
        console.log(data)
        this.pageLength = data.list.length
        if (data.length !== 0) this.formatData(data)
      }).fail(data => {
      })
    },
    getUserInfo (accounts) {
      Chat.getUserInfo(accounts).success(data => {
        data.forEach((item, i) => {
          this.loaners[i].portrait = item.avatar
        })
        this.loaners = [...this.loaners]
      })
    },
    formatData (data) {
      let accounts = []
      data.list.forEach((ele) => {
        accounts.push(ele.UserPhone)
        ele.checkFriend = false
      })
      this.loaners.push(...data.list)
      this.getUserInfo(accounts)
      this.t2 = data.t2
    },
    confirm () {
      var selectObject = []
      this.loaners.forEach(ele => {
        if (ele.checkFriend) {
          selectObject.push(ele)
        }
      })
      Storage.publishObject = selectObject
      Router.push('wanna-borrow')
    },
    loadMore () {
      this.init()
    },
    selected (item, index) {
      this.loaners[index].checkFriend = !this.loaners[index].checkFriend
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./find-lender.scss";
</style>
