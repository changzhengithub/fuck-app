<template>
  <!-- s 消息 -->
  <section class="message">
    <div class="message-header font-30 color-white">
      <p>最近消息</p>
      <i class="iconfont icon-jiahao" @click="openMore"></i>
    </div>
    <div class="message-content">
      <div class="content-search padding-horizontal-30 font-24 border-bottom-1" @click="gotoPage('search-friend')">
        <div class="search-content">
          <i class="iconfont icon-sousuo"></i>
          <span class="font-30 color-balck">搜索手机号</span>
        </div>
      </div>
      <ul class="content-list padding-horizontal-30">
        <li class="list-item border-bottom-1" v-for="(item, index) in sessions" :key="index" @click="gotoChat(item)" @touchstart="showDeleteModal" @touchend="cancelDeleteModal(item)">
          <div class="item-portrait">
            <img :src="item.portrait">
          </div>
          <div class="item-message padding-horizontal-30">
            <div class="message-title">
              <p class="font-27 color-light-blue">
                <span>{{item.name}}</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-cong"></use>
                </svg>
              </p>
              <p class="font-18 color-light-grey">{{item.chatTime}}</p>
            </div>
            <div class="message-recently">
              <p class="recently-newest  font-24 color-light-grey">{{item.content}}</p>
              <div class="recently-badge" v-if="item.unread"><span class="color-white font-21">{{item.unread > 100 ? +99 : item.unread}}</span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ModalComponent v-show="modalShow" @CLOSE_EVENT="closeModal">
      <MoreComponent v-if="moreShow"></MoreComponent>
      <DeleteSessionComponent v-if="deleteSessionShow" @DELETE_SESSION_EVENT="deleteSession"></DeleteSessionComponent>
    </ModalComponent>
  </section>
  <!-- e 消息 -->
</template>

<script>
import MoreComponent from './more/more.vue'
import DeleteSessionComponent from './delete-session/delete-session.vue'
// include dependence
import Chat from '../../../class/Chat.class.js'
import Router from '../../../class/Router.class.js'
import Storage from '../../../class/Storage.class.js'
import Time from '../../../class/Time.class.js'
import ModalComponent from '../../../module/modal/modal.vue'
export default {
  name: 'MessageComponent',
  data () {
    return {
      longTap: null,
      sessions: [],
      infoArr: [],
      updatesession: {},
      modalShow: false,
      moreShow: false,
      deleteSessionShow: false,
      deleteSessionItem: null,
      deleteSessionIndex: null
      // start params
      // end params
    }
  },
  components: {
    ModalComponent,
    MoreComponent,
    DeleteSessionComponent
    // TabComponent
    // include components
  },
  created () {
    this.getLoaclSessions()
    this.init()
  },
  methods: {
    getLoaclSessions () {
      Chat.getLocalSession().success(data => {
        console.log(data)
      })
    },
    init () {
      let accounts = []
      let count = -1
      console.log(Storage.sessions)
      if (!Storage.sessions) return
      this.sessions = Storage.sessions
      this.sessions.forEach(item => {
        accounts.push(item.to)
        if (this.$store.state.updatesession) {
          if (item.to === this.$store.state.updatesession.to) {
            item.lastMsg = this.$store.state.updatesession.lastMsg
            item.unread = this.$store.state.updatesession.unread
          }
        }
        item.chatTime = this.dealTime(item.lastMsg.time)
        this.disposeMessageType(item)
      })
      for (let i = 0; i < accounts.length; i += 150) {
        count++
        this.getUserInfo(accounts.slice(i, i + 150), count)
      }
      console.log(Storage.sessions)
    },
    getUserInfo (accounts, index) {
      Chat.getUserInfo(accounts).success(data => {
        data.forEach((item, i) => {
          this.sessions[index * 150 + i].portrait = item.avatar ? item.avatar : require('../../../../static/img/master.png')
          this.sessions[index * 150 + i].name = item.nick ? item.nick : item.account
        })
        this.sessions = [...this.sessions]
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
    gotoChat (item) {
      Storage.userInfo = {
        account: item.to,
        avatar: item.portrait,
        nick: item.name,
        updateTime: item.updateTime
      }
      Chat.sessionUnread(item.id)
      Storage.sessionId = item.id
      Chat.target = {
        id: item.to,
        portrait: item.portrait
      }
      Router.push('chat')
    },
    disposeMessageType (message) {
      switch (message.lastMsg.type) {
        case 'custom':
          message.content = '自定义消息'
          break
        case 'text':
          message.content = message.lastMsg.text
          break
        case 'image':
          message.content = '图片'
          break
        case 'tip':
          message.content = ''
          break
        case 'audio':
          message.content = '语音'
          break
      }
    },
    gotoPage (page) {
      Router.push(page)
    },
    openMore () {
      this.modalShow = true
      this.moreShow = true
    },
    deleteSession () {
      Chat.deleteSessions(this.deleteSessionItem.id).success(data => {
        console.log(data)
        this.sessions.splice(this.deleteSessionIndex, 1)
        Storage.sessions = this.sessions
        this.modalShow = false
        this.deleteSessionShow = false
      })
    },
    closeModal () {
      this.modalShow = false
      this.deleteSessionShow = false
      this.moreShow = false
    },
    showDeleteModal () {
      clearInterval(this.longTap)
      this.longTap = setTimeout(() => {
        this.modalShow = true
        this.deleteSessionShow = true
      }, 1000)
    },
    cancelDeleteModal (item, index) {
      clearInterval(this.longTap)
      this.deleteSessionItem = item
      this.deleteSessionIndex = index
    }
  },
  watch: {
    '$store.state.updatesession': function (updatesession) {
      this.sessions.forEach(item => {
        if (item.to === updatesession.to) {
          item.lastMsg = updatesession.lastMsg
          item.unread = updatesession.unread
          item.chatTime = this.dealTime(updatesession.updateTime)
          this.disposeMessageType(item)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./messages.scss";
</style>
