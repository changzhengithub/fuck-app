<template>
  <!-- s 好友 -->
  <section class="friends">
    <div class="friends-title bg-white">
      <span class="font-30">好友</span>
      <div class="title-icon" @click="gotoPage('add-friend')">
        <i class="iconfont icon-jiahaoyou"></i>
      </div>
    </div>
    <div class="friends-search padding-horizontal-30 font-24" @click="gotoPage('search-friend')">
      <div class="search-content">
        <i class="iconfont icon-sousuo"></i>
        <span class="font-30 color-balck">搜索手机号</span>
      </div>
    </div>
    <div class="friends-new bg-white padding-horizontal-30" @click="gotoPage('new-friend')">
      <div class="new-icon">
        <i class="iconfont icon-xindehaoyou color-white"></i>
      </div>
      <p class="font-30 color-black">新的好友</p>
    </div>
    <ul class="friends-list padding-horizontal-30 bg-white">
      <li class="list-item border-bottom-1" v-for="(item, index) in friends" :key="index" @click="gotoPersonalInfo('personal-info', item)">
        <div class="item-portrait">
          <img :src="item.avatar">
        </div>
        <div class="item-detail padding-horizontal-30">
          <p class="font-30 color-blue">
            <span>{{item.nick}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-cong"></use>
            </svg>
          </p>
          <p class="font-27 color-deep-grey"><span>借条ID：</span><span>{{item.account}}</span></p>
        </div>
      </li>
    </ul>
  </section>
  <!-- e 好友 -->
</template>

<script>
// include dependence
import Chat from '../../../class/Chat.class.js'
import Router from '../../../class/Router.class.js'
import Storage from '../../../class/Storage.class.js'
import TitleComponent from '../../../module/title/title.vue'
export default {
  name: 'FriendsComponent',
  data () {
    return {
      friends: [],
      // start params
      'title': {
        contentText: '好友',
        icon: 'jiahaoyou'
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
  },
  methods: {
    init () {
      let accounts = []
      Chat.getFriends().success(friends => {
        friends.forEach(friend => {
          accounts.push(friend.account)
        })
        this.getFriendsInfo(accounts)
      })
    },
    getFriendsInfo (accounts) {
      Chat.getUserInfo(accounts).success(friends => {
        this.friends = friends
        friends.forEach(friend => {
          friend.selected = false
          if (!friend.avatar) friend.avatar = '../../../../static/img/master.png'
          this.friends.push(friend)
        })
      })
    },
    confirm () {},
    gotoPage (page) {
      Router.push(page)
    },
    gotoPersonalInfo (page, item) {
      Storage.userInfo = item
      Router.push(page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./friends.scss";
</style>
