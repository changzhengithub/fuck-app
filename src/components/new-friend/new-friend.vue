<template>
  <!-- s 验证消息 -->
  <section class="new-friend padding-top-126 bg-white">
    <TitleComponent :title="title" @OTHER_EVENT="clearVerify"></TitleComponent>
    <ul class="friend-list padding-horizontal-24 bg-white">
      <li class="list-item border-bottom-1" v-for="(item, index) in verifyMessage" :key="index">
        <div class="item-portrait">
          <img :src="item.portrait">
        </div>
        <div class="item-detail">
          <div class="detail-message">
            <p class="message-title">
              <span class="title-name font-27 color-light-blue">{{item.name}}</span>
              <span class="title-time font-18 color-light-grey">{{item.ps}}</span>
            </p>
            <p class="message-tip font-24 color-light-grey">通过好友搜索添加通过好友搜索添加通过好友搜索添加</p>
          </div>
          <div class="detail-right">
            <div class="right-button" v-if="true">
              <button class="button color-white" @click="passApply(item)"><div>同意</div></button>
              <button class="button color-white"><div>拒绝</div></button>
            </div>
            <div class="right-status" v-if="false"><span class="font-24 color-light-grey">已同意</span></div>
          </div>
        </div>
      </li>
    </ul>
  </section>
  <!-- e 验证消息 -->
</template>

<script>
// include dependence
import Chat from '../../class/Chat.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'NewFriendComponent',
  data () {
    return {
      verifyMessage: [],
      // start params
      'title': {
        contentText: '验证消息',
        rightText: '清空'
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
      console.log(Storage.verifyMessage)
      this.verifyMessage = Storage.verifyMessage
      Storage.verifyMessage.forEach((verify, i) => {
        accounts.push(verify.from)
        Chat.getUserInfo(verify.from).success(data => {
          this.verifyMessage[i].portrait = data.avatar ? data.avatar : require('../../assets/images/master.png')
          this.verifyMessage[i].name = data.nick ? data.nick : data.account
          this.verifyMessage = [...this.verifyMessage]
        })
        // switch (verify.type) {
        //   case 'passFriendApply':
        //     this.passFriendApply(verify, verify.friend)
        //     break
        //   case 'rejectFriendApply':
        //     this.rejectFriendApply(verify.friend)
        //     break
        //   case 'deleteFriend':
        //     this.deleteFriend(verify.from)
        //     break
        //   default :
        //     console.log(verify)
        // }
      })
    },
    getUserInfo (accounts) {
      Chat.getUserInfo(accounts).success(data => {
        data.forEach((item, i) => {
          this.verifyMessage[i].portrait = item.avatar ? item.avatar : require('../../assets/images/master.png')
          this.verifyMessage[i].name = item.nick ? item.nick : item.account
        })
        this.verifyMessage = [...this.verifyMessage]
        console.log(this.verifyMessage)
      })
    },
    passApply (item) {
      Chat.passFriendApply(item, item.from).success(data => {
        console.log(data)
      })
    },
    passFriendApply (msg, account) {},
    rejectFriendApply (account) {},
    deleteFriend (account) {},
    clearVerify () {
      this.verifyMessage = []
      Storage.verifyMessage = this.verifyMessage
    },
    gotoPage (page) {
      Router.push(page)
    }
  },
  watch: {
    '$store.state.verifyMessage': function (verifyMessage) {
      console.log(verifyMessage)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./new-friend.scss";
</style>
