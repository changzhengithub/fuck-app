<template>
  <!-- s 搜索好友 -->
  <section class="search-friend">
    <div class="friend-header border-bottom-1">
      <div class="header-title padding-horizontal-30">
        <i class="iconfont icon-sousuo font-30"></i>
        <div class="header-search">
          <input type="text" v-model="phoneNumber" placeholder="搜索手机号" autofocus>
          <i class="iconfont icon-delete font-27" v-show="clearInputShow" @click="clearInput"></i>
        </div>
        <button class="button bg-white font-30 color-black" @click="searchFriend"><div>{{searchBtnName}}</div></button>
      </div>
    </div>
    <div class="friend-content">
      <div class="content-item padding-horizontal-30" v-if="searchFriendData" @click="gotoPage">
        <div class="item-portrait">
          <img src="http://iph.href.lu/87x87">
        </div>
        <p class="item-name font-30 color-black">名字</p>
        <button class="button padding-horizontal-24 color-white font-24" :disabled="addDisabled" @click="addFriedn(account)"><div>{{buttonText}}</div></button>
      </div>
      <WithoutComponent v-if="!searchFriendData"></WithoutComponent>
    </div>
  </section>
  <!-- e 搜索好友 -->
</template>

<script>
// include dependence
import Chat from '../../class/Chat.class.js'
import Check from '../../class/Check.class.js'
import Error from '../../class/Error.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import WithoutComponent from '../../module/without/without.vue'
export default {
  name: 'SearchFriendComponent',
  data () {
    return {
      phoneNumber: '',
      buttonText: '添加好友',
      addDisabled: false,
      searchFriendData: null,
      searchBtnName: '取消',
      clearInputShow: true
      // start params
      // end params
    }
  },
  components: {
    WithoutComponent
    // include components
  },
  methods: {
    clearInput () {
      if (!this.phoneNumber) return
      this.phoneNumber = ''
      this.clearInputShow = false
    },
    // 搜索好友
    searchFriend () {
      if (!this.phoneNumber) {
        Router.back()
        return
      }
      if (!Check.phone(this.phoneNumber)) {
        Error.show('请输入正确手机号')
        return
      }
      Http.send({
        url: 'url',
        data: {}
      }).success(data => {
        this.searchFriendData = data
      }).fail(data => {
      })
    },
    // 添加好友
    addFriedn (account) {
      Chat.applyFriend = account
      this.buttonText = '已发送'
      this.addDisabled = true
    },
    gotoPage () {}
  },
  watch: {
    phoneNumber (newData, oldData) {
      if (!newData) this.searchBtnName = '取消'
      if (newData) {
        this.searchBtnName = '搜索'
        this.clearInputShow = true
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./search-friend.scss";
</style>
