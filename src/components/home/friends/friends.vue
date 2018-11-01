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
    <ul class="friends-list">
      <li class="list-new padding-horizontal-30 bg-white " @click="gotoPage('new-friend')">
        <div class="new-icon">
          <i class="iconfont icon-xindehaoyou color-white"></i>
        </div>
        <p class="font-30 color-black">新的好友</p>
        <div class="new-unread font-24 color-white" v-if="unRead">{{unRead}}</div>
      </li>
      <li class="list-item padding-horizontal-30 bg-white" v-for="(item, index) in friends" :key="index" @click="gotoPersonalInfo('personal-info', item)">
        <div class="item-content border-bottom-1">
          <div class="content-portrait">
            <img :src="item.avatar">
          </div>
          <div class="content-detail">
            <p class="font-33 color-blue">
              <span>{{item.nick ? item.nick : item.account}}</span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-cong"></use>
              </svg>
            </p>
            <!-- <p class="font-27 color-deep-grey"><span>借条ID：</span><span>{{item.account}}</span></p> -->
          </div>
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
      unRead: '',
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
      this.unRead = Storage.sysMsgUnread
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
        friends.forEach(friend => {
          if (!friend.avatar) friend.avatar = '../../../../static/img/master.png'
          this.friends.push(friend)
        })
        console.log(this.friends)
      })
    },
    gotoPage (page) {
      Router.push(page)
    },
    gotoPersonalInfo (page, item) {
      Storage.userInfo = item
      Router.push(page)
    }
  },
  watch: {
    '$store.state.sysMsgUnread': function (sysMsgUnread) {
      this.unRead = sysMsgUnread
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./friends.scss";
</style>
