<template>
  <!-- s 个人信息 -->
  <section class="personal-info">
    <div class="info-header">
      <div class="header font-30">
        <i class="iconfont font-33 icon-arrow-left back" @click="back"></i>
        <span>个人资料</span>
        <i class="iconfont font-33 icon-shenglvehao more" @click="more"></i>
      </div>
    </div>
    <div class="info-user">
      <div class="user-portrait">
        <img :src="personalInfo.avatar">
      </div>
      <div class="user-detail">
        <p class="detail-id"><span>借条ID：</span><span>{{personalInfo.account}}</span></p>
        <p class="detail-name"><span>{{personalInfo.nick}}</span><span>{{personalDetail.Rank}}</span></p>
        <div class="detail-attestation">
          <div class="attestation-item">{{personalDetail.RankName}}</div>
        </div>
      </div>
    </div>
    <div class="info-tab">
      <div class="tab-nav">
        <div class="nav-item" :class="{'nav-active': !tabSwitchShow}" @click="tabSwitchHome">主页</div>
        <div class="nav-item" :class="{'nav-active': tabSwitchShow}" @click="tabSwitchDeal">交易</div>
      </div>
      <div class="tab-content">
        <div class="content-home" v-if="!tabSwitchShow">
          <ul class="home-list padding-horizontal-21 bg-white">
            <li class="list-item">
              <div class="item-value">
                <span>进行中的借款</span>
                <span>{{personalDetail.BorrowCount}}</span>
              </div>
              <i class="iconfont icon-cong"></i>
            </li>
            <li class="list-item">
              <div class="item-value">
                <span>手机号</span>
                <span>{{account}}</span>
              </div>
            </li>
            <li class="list-item">
              <div class="item-value">
                <span>注册于</span>
                <span>{{personalDetail.RegTime}}</span>
              </div>
            </li>
            <li class="list-item">
              <div class="item-value">
                <span>信用记录</span>
                <span>{{personalDetail.OverdueCount}}</span>
              </div>
            </li>
            <li class="list-item" @click="gotoPage('credit')">
              <div class="item-value">
                <span>认证中心</span>
                <span>{{personalDetail.creditCenter}}</span>
              </div>
              <i class="iconfont icon-cong"></i>
            </li>
          </ul>
          <div class="home-chat padding-horizontal-30" v-if="isMine">
            <div class="chat-send">
              <button class="send-btn bg-blue" @click="gotoChat('chat')">
                <div class="font-30 color-white">发起聊天</div>
              </button>
            </div>
            <div class="chat-lend">
              <button class="lend-btn bg-white" @click="gotoPage('wanna-borrow')">
                <div class="font-30 color-black">向TA借款</div>
              </button>
            </div>
          </div>
        </div>
        <div class="content-deal" v-if="tabSwitchShow">
          <div class="deal-total">
            <div class="title">全部借贷情况</div>
            <ul class="list">
              <li class="list-item">
                <p class="item-title">类型</p>
                <div class="itme-right">
                  <p>借入</p>
                  <p>借出</p>
                </div>
              </li>
              <li class="list-item">
                <p class="item-title">累计笔数</p>
                <div class="itme-right">
                  <p>{{transferInfo.BorrowCount_All}}</p>
                  <p>{{transferInfo.LoanCount_All}}</p>
                </div>
              </li>
              <li class="list-item">
                <p class="item-title">当前金额</p>
                <div class="itme-right">
                  <p>{{transferInfo.BorrowAmount_All}}</p>
                  <p>{{transferInfo.LoanAmount_All}}</p>
                </div>
              </li>
              <li class="list-item">
                <p class="item-title">未偿还金额</p>
                <div class="itme-right">
                  <p>{{transferInfo.UnpaidBorrowAmount_All}}</p>
                  <p>{{transferInfo.UnpaidloanAmount_All}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="deal-progress">
            <div class="title">进行中的借款</div>
            <ul class="list">
              <li class="list-item">
                <p class="item-title">类型</p>
                <div class="itme-right">
                  <p>借入 <i class="iconfont icon-cong"></i></p>
                  <p>借出</p>
                </div>
              </li>
              <li class="list-item">
                <p class="item-title">累计笔数</p>
                <div class="itme-right">
                  <p>{{transferInfo.BorrowCount_Conduct}}</p>
                  <p>{{transferInfo.LoanCount_Conduct}}</p>
                </div>
              </li>
              <li class="list-item">
                <p class="item-title">当前金额</p>
                <div class="itme-right">
                  <p>{{transferInfo.BorrowAmount_Conduct}}</p>
                  <p>{{transferInfo.LoanAmount_Conduct}}</p>
                </div>
              </li>
              <li class="list-item">
                <p class="item-title">未偿还金额</p>
                <div class="itme-right">
                  <p>{{transferInfo.UnpaidBorrowAmount_Conduct}}</p>
                  <p>{{transferInfo.UnpaidLoanAmount_Conduct}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ModalComponent v-show="modalShow" @CLOSE_EVENT="closeModal">
      <MoreComponent></MoreComponent>
    </ModalComponent>
  </section>
  <!-- e 个人信息 -->
</template>

<script>
import MoreComponent from './more/more.vue'
// include dependence
import Chat from '../../class/Chat.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import ModalComponent from '../../module/modal/modal.vue'
export default {
  name: 'PersonalInfoComponent',
  data () {
    return {
      name: Storage.name,
      account: Storage.phone,
      personalDetail: {},
      personalInfo: {},
      transferInfo: null,
      tabSwitchShow: false,
      modalShow: false,
      isMine: false
      // start params
      // end params
    }
  },
  components: {
    ModalComponent,
    MoreComponent
    // include components
  },
  created () {
    this.init()
    this.getPersonalInfo()
  },
  methods: {
    init () {
      Http.send({
        url: 'PersonalDetail',
        data: {
          token: Storage.token,
          phone: Storage.phone
        }
      }).success(data => {
        this.formatData(data)
        this.personalDetail = data.MemberInfo
        this.transferInfo = data.TransactionInfo
      }).fail(data => {
      })
    },
    getPersonalInfo () {
      console.log(Storage.userInfo)
      if (!Storage.userInfo) return
      this.personalInfo = Storage.userInfo
      // this.personalInfo.account = this.personalInfo.account === Storage.chat.id ? this.personalInfo.account : Replace.mask(this.personalInfo.account, 3, 4, '*')
      if (this.personalInfo.account !== Storage.chat.id) {
        this.isMine = true
      }
    },
    formatData (data) {
      let info = data.MemberInfo
      if (!info.OverdueCount) {
        data.MemberInfo.OverdueCount = '无逾期'
      } else {
        data.MemberInfo.OverdueCount = info.OverdueCount + '笔逾期'
      }
      if (!info.BorrowCount) {
        data.MemberInfo.BorrowCount = '当前无借款'
      } else {
        data.MemberInfo.BorrowCount = info.BorrowCount + '笔'
      }
      if (!info.Photo) {
        data.MemberInfo.Photo = 'http://iph.href.lu/87x87'
      }
      data.MemberInfo.RegTime = info.RegTime.substr(0, 10)
      let creditCenter = ''
      let credit = [info.IsIdentityPass, info.IsContactPass, info.IsPhonePass, info.IsZhiMaPass, info.IsBankCardPass]
      let creditArr = ['请认证身份信息', '请认证联系人', '请认证手机号', '请认证银行卡', '请认证芝麻信用']
      for (let i = 0; i < credit.length; i++) {
        if (!credit[i]) {
          creditCenter = creditArr[i]
          break
        } else {
          creditCenter = '已通过认证'
        }
      }
      data.MemberInfo.creditCenter = creditCenter
    },
    back () {
      Router.back()
    },
    more () {
      this.modalShow = true
    },
    tabSwitchHome () {
      this.tabSwitchShow = false
    },
    tabSwitchDeal () {
      this.tabSwitchShow = true
    },
    closeModal () {
      this.modalShow = false
    },
    gotoPage (page) {
      Router.push(page)
    },
    gotoChat (page) {
      Chat.target = {
        id: Storage.userInfo.account,
        portrait: Storage.userInfo.avatar
      }
      Router.push(page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./personal-info.scss";
</style>
