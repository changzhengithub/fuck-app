<template>
  <!-- s 选择好友 -->
  <section class="select-friend padding-top-126">
    <TitleComponent :title="title" @OTHER_EVENT="gotoPage('personal-info')"></TitleComponent>
    <div class="friend-content padding-left-30 bg-white">
      <div class="content-item border-bottom-1" v-for="(friend, index) in friends" :key="index" @click="selectFriend(friend)">
        <div class="item-portrait">
          <img :src="friend.avatar">
        </div>
        <div class="item-detail padding-horizontal-30">
          <p class="font-30 color-black">{{friend.nick}}</p>
          <p class="font-27 color-deep-grey"><span>借条ID：</span><span>{{friend.userid}}</span></p>
        </div>
      </div>
    </div>
    <ModalComponent v-show="modalShow" @CLOSE_EVENT="closeModal">
      <SendCardComponent v-show="modalShow" :cardInfo="cardInfo" :userid="userid" @CANCEL_EVENT="closeModal" @SEND_EVENT="sendCard"></SendCardComponent>
    </ModalComponent>
  </section>
  <!-- e 选择好友 -->
</template>

<script>
import SendCardComponent from './send-card/send-card.vue'
// include dependence
import Chat from '../../class/Chat.class.js'
import Router from '../../class/Router.class.js'
import ModalComponent from '../../module/modal/modal.vue'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'SelectFriendComponent',
  data () {
    return {
      friends: [],
      cardInfo: {},
      userid: '',
      modalShow: false,
      // start params
      'title': {
        contentText: '选择好友'
      }
      // end params
    }
  },
  components: {
    TitleComponent,
    ModalComponent,
    SendCardComponent
    // include components
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let accounts = []
      if (!this.$store.state.friends) return
      this.$store.state.friends.forEach(item => {
        accounts.push(item.account)
      })
      for (let i = 0; i < accounts.length; i += 150) {
        this.getUserInfo(accounts.slice(i, i + 150))
      }
    },
    getUserInfo (accounts) {
      Chat.getUserInfo(accounts).success(data => {
        data.forEach(item => {
          if (!item.avatar) item.avatar = '../../../../static/img/master.png'
          item.custom = JSON.parse(item.custom)
          item.userid = item.custom.userid.substr(0, 3) + '****' + item.custom.userid.substr(-4)
          this.friends.push(item)
        })
      })
    },
    selectFriend (item) {
      this.cardInfo = {
        target: Chat.target.id,
        id: item.custom.userid,
        title: item.nick ? item.nick : item.custom.userid,
        money: item.avatar
      }
      this.userid = item.userid
      this.modalShow = true
    },
    sendCard () {
      Chat.sendBusinessCard(this.cardInfo).success(data => {
        console.log(data)
        if (data) Router.push('chat')
      })
    },
    closeModal () {
      this.modalShow = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./select-friend.scss";
</style>
