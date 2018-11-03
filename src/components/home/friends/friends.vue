<template>
  <!-- s 好友 -->
  <section class="friends">
    <div class="friends-title bg-white">
      <span class="font-30">好友</span>
      <div class="title-icon" @click="gotoPage('add-friend')">
        <i class="iconfont icon-jiahaoyou"></i>
      </div>
    </div>
    <div class="friends-search padding-horizontal-30 border-bottom-1 font-24" @click="gotoPage('search-friend')">
      <div class="search-content">
        <i class="iconfont icon-sousuo"></i>
        <span class="font-30 color-balck">搜索手机号</span>
      </div>
    </div>
    <div class="friends-new padding-horizontal-30 bg-white " @click="gotoPage('new-friend')">
      <div class="new-icon">
        <i class="iconfont icon-xindehaoyou color-white"></i>
      </div>
      <p class="font-30 color-black">新的好友</p>
      <div class="new-unread font-24 color-white" v-if="unRead">{{unRead}}</div>
    </div>
    <div class="friends-navbar" ref="navBox">
      <ul class="navbar-list"  @touchstart="handleTouchStart($event)" @touchmove="handleTouchMove($event)" @touchend="handleTouchEnd($event)">
        <li class="list-item font-18 color-deep-grey" ref="rightNav" v-for="(item, index) in navList" :key="index">{{item}}</li>
      </ul>
      <div class="navbar-toast font-51 color-white" v-if="touchShow">{{touchChar}}</div>
    </div>
    <ul class="friends-list">
      <section class="list-contact">
        <div class="contact-content">
          <ul class="content-list" ref="leftList">
            <li class="list-char" ref="listItem" v-for="(item, index) in InitialList" :key="index">
              <div class="char-title font-36"><span>{{item.title}}</span></div>
              <ul class="char-list bg-white">
                <li class="list-friend" v-for="(friend, index) in item.arr" :key="index" @click="gotoPersonalInfo('personal-info', friend)">
                  <div class="friend-content border-bottom-1">
                    <div class="content-portrait">
                      <img :src="friend.avatar">
                    </div>
                    <div class="content-detail">
                      <p class="font-33 color-blue">
                        <span>{{friend.nick ? friend.nick : friend.account}}</span>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-cong"></use>
                        </svg>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </ul>
  </section>
  <!-- e 好友 -->
</template>

<script>
// include dependence
import Chat from '../../../class/Chat.class.js'
import Router from '../../../class/Router.class.js'
import Sort from '../../../class/Sort.class.js'
import Storage from '../../../class/Storage.class.js'
import ContactListComponent from '../../../module/contact-list/contact-list.vue'
import TitleComponent from '../../../module/title/title.vue'
export default {
  name: 'FriendsComponent',
  data () {
    return {
      unRead: '',
      scrollNum: 0,
      currentNum: 0,
      navTop: 0,
      navWidth: 0,
      itemHeight: 0,
      itemWidth: 0,
      pageY: 0,
      pageX: 0,
      touchChar: '',
      touchShow: false,
      firstStrArr: [],
      friends: [],
      InitialList: [],
      navList: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      // start params
      'contactList': undefined,
      'title': {
        contentText: '好友',
        icon: 'jiahaoyou'
      }
      // end params
    }
  },
  components: {
    TitleComponent,
    ContactListComponent
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
        this.InitialList = Sort.getData(this.friends)
      })
    },
    gotoPage (page) {
      Router.push(page)
    },
    gotoPersonalInfo (page, item) {
      Storage.userInfo = item
      Router.push(page)
    },
    selectChar (item) {
      this.touchShow = true
      this.touchChar = item
    },
    handleTouchStart (event) {
      event.preventDefault()
      this.itemHeight = this.$refs.rightNav[0].offsetHeight
      this.itemWidth = this.$refs.rightNav[0].offsetWidth
      this.navWidth = this.$refs.navBox.offsetLeft
      this.navTop = this.$refs.navBox.offsetTop
      this.navHeight = this.$refs.navBox.offsetHeight
      this.pageY = event.targetTouches[0].pageY
      this.pageX = event.targetTouches[0].pageX
      this.currentNum = Math.floor((this.pageY - this.navTop) / this.itemHeight)
      this.touchShow = true
      this.touchChar = this.navList[this.currentNum]
      this.InitialList.forEach((item, i) => {
        if (item.title === this.touchChar) {
          this.$refs.listItem[i].scrollIntoView()
        }
      })
      this.$refs.rightNav.forEach(item => {
        item.style.backgroundColor = 'rgba(0, 0, 0, .3)'
      })
      this.$refs.rightNav[this.currentNum].style.backgroundColor = '#f2f2f2'
    },
    handleTouchMove (event) {
      this.pageY = event.targetTouches[0].pageY
      this.pageX = event.targetTouches[0].pageX
      this.currentNum = Math.floor((this.pageY - this.navTop) / this.itemHeight)
      if (this.currentNum >= this.navList.length) this.currentNum = this.navList.length - 1
      if (this.currentNum <= 0) this.currentNum = 0
      this.touchChar = this.navList[this.currentNum]
      this.InitialList.forEach((item, i) => {
        if (item.title === this.touchChar) {
          this.$refs.listItem[i].scrollIntoView()
        }
      })
      if (this.pageY <= this.navTop) this.touchChar = this.navList[0]
      if (this.pageY >= this.navTop + this.navHeight) this.touchChar = this.navList[this.navList.length - 1]
      this.$refs.rightNav.forEach(item => {
        item.style.backgroundColor = 'rgba(0, 0, 0, .3)'
      })
      this.$refs.rightNav[this.currentNum].style.backgroundColor = '#f2f2f2'
    },
    handleTouchEnd () {
      this.$refs.rightNav.forEach(item => {
        item.style.backgroundColor = '#fff'
      })
      this.$refs.rightNav[this.currentNum].style.backgroundColor = '#fff'
      this.touchShow = false
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
