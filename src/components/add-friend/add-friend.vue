<template>
  <!-- s 添加好友 -->
  <section class="add-friend">
    <TitleComponent :title="title" @BACK_EVENT="backPage"></TitleComponent>
    <div class="friend-search font-27 padding-horizontal-30 bg-white" @click="gotoPage('search-friend')">
      <div class="search-content color-light-black">
        <i class="iconfont icon-sousuo"></i>
        <span class="font-30 color-balck">搜索手机号</span>
      </div>
    </div>
    <div class="frient-id font-27 color-black">
      <span>借条大师ID: 7798</span>
    </div>
    <div class="friend-wechat bg-white padding-horizontal-30">
      <div class="wechat-portrait">
        <img src="../../assets/images/master.png">
      </div>
      <div class="wechat-detail">
        <p class="font-30 color-black">微信好友</p>
        <p class="font-24 color-light-grey">添加或邀请微信好友</p>
      </div>
    </div>
    <ul class="friend-list padding-left-30 bg-white">
      <li class="list-item border-bottom-1">
        <div class="item-portrait">
          <img src="../../assets/images/master.png">
        </div>
        <div class="item-detail">
          <p class="font-30 color-black">微信好友</p>
          <p class="font-24 color-light-grey">添加或邀请微信好友</p>
        </div>
        <div class="item-button">
          <button class="button bg-grey color-white font-24" v-if="false"><div><i class="iconfont icon-cong"></i></div></button>
          <button class="button bg-blue color-white font-24" v-if="false"><div><i class="iconfont icon-jianyu"></i></div></button>
          <button class="button note bg-blue color-white font-24" v-else-if="true"><div>短信邀请</div></button>
        </div>
      </li>
    </ul>
  </section>
  <!-- e 添加好友 -->
</template>

<script>
// include dependence
import Router from '../../class/Router.class.js'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'AddFriendComponent',
  data () {
    return {
      // start params
      'title': {
        contentText: '添加好友'
      }
      // end params
    }
  },
  components: {
    TitleComponent
    // include components
  },
  methods: {
    gotoPage (page) {
      Router.push(page)
    },
    backPage () {}
  }
}
</script>

<style lang="sass" scoped>
@import "./add-friend.scss";
</style>
