<template>
  <!-- s 黑名单 -->
  <section class="black-list padding-top-126 bg-white">
    <TitleComponent :title="title"></TitleComponent>
    <div class="list-item padding-horizontal-30 border-bottom-1" v-for="(item, index) in blacklist" :key="index">
      <img class="item-portrait" :src="item.portrait">
      <!-- <img class="item-portrait" :src="item.portrait" @load="getUserInfo"> -->
      <div class="item-detail">
        <p class="font-30 color-black">{{item.nick}}</p>
        <button class="detail-btn font-24 color-blue border-radius-12 bg-white" @click="remove(index)">
          <div>解除黑名单</div>
        </button>
      </div>
    </div>
    <WithoutComponent v-if="!blacklist.length"></WithoutComponent>
  </section>
  <!-- e 黑名单 -->
</template>

<script>
// include dependence
import Chat from '../../class/Chat.class.js'
import TitleComponent from '../../module/title/title.vue'
import WithoutComponent from '../../module/without/without.vue'
export default {
  name: 'BlackListComponent',
  data () {
    return {
      blacklist: [],
      // start params
      'title': {
        contentText: '黑名单'
      }
      // end params
    }
  },
  components: {
    TitleComponent,
    WithoutComponent
    // include components
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let accounts = []
      Chat.getBlacklist().success(blacklist => {
        delete blacklist.invalid
        blacklist.forEach(item => {
          accounts.push(item.account)
        })
        if (accounts.length === 0) return
        this.getBlackUserInfo(accounts)
      })
    },
    getBlackUserInfo (accounts) {
      Chat.getUserInfo(accounts).success(data => {
        console.log(data)
        data.forEach(item => {
          item.portrait = item.avatar ? item.avatar : '../../../static/img/master.png'
          this.blacklist.push(item)
        })
      })
    },
    // getUserInfo (index) {
    //   let item = this.blacklist[index]
    //   if (item.mark || !item.account) return
    //   Chat.getUserInfo(item.account).success(info => {
    //     this.blacklist[index] = {
    //       portrait: info.avatar,
    //       name: info.nick,
    //       mark: true,
    //       remove: item.remove,
    //       account: item.account
    //     }
    //     let arr = []
    //     this.blacklist.forEach(unit => {
    //       arr.push(unit)
    //     })
    //     this.blacklist = arr
    //   })
    // },
    remove (index) {
      let balckUser = this.blacklist[index]
      // Chat.removeBlack = item.account
      Chat.balckToggle(balckUser.account, false).success(data => {
        console.log(data)
        this.blacklist.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./black-list.scss";
</style>
