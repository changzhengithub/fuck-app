<template>
  <!-- s 发布对象 -->
  <section class="publish-object padding-top-126">
    <TitleComponent :title="title" @OTHER_EVENT="confirm"></TitleComponent>
    <div class="object-select bg-white">
      <div class="select-item padding-horizontal-30 border-bottom-1" @click="gotoPage('find-lender')">
        <div class="item-svg">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunzhaochujieren"></use>
          </svg>
        </div>
        <div class="item-detail">
          <p class="detail-title font-30 color-black">寻找出借人</p>
          <i class="iconfont icon-arrow-right font-27 color-light-grey"></i>
        </div>
      </div>
      <div class="select-item padding-horizontal-30 border-bottom-1" @click="gotoPage('history-lender')">
        <div class="item-svg">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lishichujieren"></use>
          </svg>
        </div>
        <div class="item-detail">
          <p class="detail-title font-30 color-black">历史出借人</p>
          <i class="iconfont icon-arrow-right font-27 color-light-grey"></i>
        </div>
      </div>
    </div>
    <div class="object-title border-bottom-1">
      <i class="iconfont icon-yuandian font-18 color-blue"></i>
      <span class="font-27 color-deep-grey">我的好友</span>
    </div>
    <div class="object-friend padding-left-30 bg-white">
      <div class="friend-item border-bottom-1" v-for="(friend, index) in friendList" :key="index" @click="selectFriend(friend, index)">
        <div class="item-portrait">
          <img :src="friend.avatar">
        </div>
        <div class="item-detail padding-horizontal-30">
          <div class="detail-title">
            <p class="font-33 color-black">{{friend.nick}}</p>
            <p class="font-27 color-deep-grey"><span>借条ID：</span><span>****{{friend.account.substr(-4)}}</span></p>
          </div>
          <i class="iconfont icon-gouxuan color-light-grey font-30" :class="{'icon-jindu color-blue': friend.selected}"></i>
        </div>
      </div>
    </div>
  </section>
  <!-- e 发布对象 -->
</template>

<script>
// include dependence
import Chat from '../../class/Chat.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'PublishObjectComponent',
  data () {
    return {
      selectIndex: null,
      selectShow: false,
      friendList: [],
      // start params
      'title': {
        contentText: '发布对象',
        rightText: '确定'
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
      let accounts = []
      Chat.getFriends().success(friends => {
        friends.forEach(friend => {
          accounts.push(friend.account)
        })
        for (let i = 0; i < accounts.length; i += 150) {
          this.getFriendsInfo(accounts.slice(i, i + 150))
        }
      })
    },
    getFriendsInfo (accounts) {
      Chat.getUserInfo(accounts).success(friends => {
        friends.forEach(friend => {
          friend.selected = false
          friend.avatar = friend.avatar ? friend.avatar : '../../../static/img/master.png'
          this.friendList.push(friend)
        })
      })
    },
    confirm () {
      var selectObject = []
      this.friendList.forEach(ele => {
        if (ele.selected) {
          selectObject.push({
            imAccid: ele.Accid,
            Name: ele.Name,
            Phone: ele.UserPhone
          })
        }
      })
      Storage.publishObject = selectObject
      Router.push('wanna-borrow')
    },
    selectFriend (item, index) {
      this.friendList[index].selected = !this.friendList[index].selected
    },
    gotoPage (page) {
      Router.push(page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./publish-object.scss";
</style>
