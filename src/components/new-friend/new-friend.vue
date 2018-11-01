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
              <span class="title-time font-18 color-light-grey">{{item.verifyTime}}</span>
            </p>
            <p class="message-tip font-24 color-light-grey">{{item.ps}}</p>
          </div>
          <div class="detail-right" v-if="item.type == 'applyFriend'">
            <div class="right-button" v-if="item.state == 'init'">
              <button class="button color-white" @click="passApply(item, index)"><div>同意</div></button>
              <button class="button color-white" @click="rejectApply(item, index)"><div>拒绝</div></button>
            </div>
            <div class="right-status" v-if="item.state == 'passed'"><span class="font-24 color-black">已同意</span></div>
            <div class="right-status" v-if="item.state == 'rejected'"><span class="font-24 color-black">已拒绝</span></div>
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
import Time from '../../class/Time.class.js'
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
      Chat.localSysMsgs().success(data => {
        if (data.sysMsgs.length === 0) return
        Chat.markSysMsgRead(data.sysMsgs)
        let accounts = []
        this.verifyMessage = data.sysMsgs
        data.sysMsgs.forEach((verify, i) => {
          verify.verifyTime = this.dealTime(verify.time)
          accounts.push(verify.from)
          Chat.getUserInfo(verify.from).success(data => {
            this.verifyMessage[i].portrait = data.avatar ? data.avatar : require('../../assets/images/master.png')
            this.verifyMessage[i].name = data.nick ? data.nick : data.account
            if (verify.type === 'deleteFriend') {
              this.verifyMessage[i].ps = '你已被好友删除'
            }
            if (verify.type === 'passFriendApply') {
              this.verifyMessage[i].ps = '通过了你的好友请求'
            }
            if (verify.type === 'rejectFriendApply') {
              this.verifyMessage[i].ps = '拒绝了你的好友请求'
            }
            this.verifyMessage = [...this.verifyMessage]
          })
        })
      })
    },
    passApply (item, index) {
      Chat.passFriendApply(item, item.from).success(data => {
        this.verifyMessage[index].state = 'passed'
      })
    },
    rejectApply (item, index) {
      Chat.rejectFriendApply(item, item.from).success(data => {
        this.verifyMessage[index].state = 'rejected'
      })
    },
    clearVerify () {
      Chat.deleteLocalSysMsgs().success(data => {
        this.verifyMessage = []
        Storage.verifyMessage = this.verifyMessage
      })
    },
    dealTime (updateTime) {
      let chatTime = ''
      let weeHour = new Date(new Date().setHours(0, 0, 0, 0))
      let befroeWeehour = new Date(new Date().setHours(0, 0, 0, 0)) - 86400000
      if (updateTime > weeHour) {
        chatTime = Time.format('HH', updateTime) > 12 ? '下午  ' + Time.format('hh : mm', updateTime) : '上午  ' + Time.format('hh : mm', updateTime)
        return chatTime
      }
      if (updateTime > befroeWeehour) {
        chatTime = '昨天'
        return chatTime
      }
      chatTime = Time.format('YYYY-MM-DD', updateTime)
      return chatTime
    },
    gotoPage (page) {
      Router.push(page)
    }
  },
  watch: {
    '$store.state.verifyMessage': function (verifyMessage) {
      if (verifyMessage.category !== 'friend') return
      Chat.markSysMsgRead(verifyMessage)
      if (verifyMessage.type === 'deleteFriend') {
        verifyMessage.ps = '你已被好友删除'
      }
      if (verifyMessage.type === 'passFriendApply') {
        verifyMessage.ps = '通过了你的好友请求'
      }
      if (verifyMessage.type === 'rejectFriendApply') {
        verifyMessage.ps = '拒绝了你的好友请求'
      }
      let newVerify = verifyMessage
      Chat.getUserInfo(verifyMessage.from).success(data => {
        newVerify.portrait = data.avatar ? data.avatar : require('../../assets/images/master.png')
        newVerify.name = data.nick ? data.nick : data.account
        this.verifyMessage.push(newVerify)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./new-friend.scss";
</style>
