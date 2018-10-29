<template>
  <!-- s 借条模板/出借模板 -->
  <section class="iou-template padding-top-126">
    <TitleComponent :title="title"></TitleComponent>
    <div class="template-content">
      <div class="content-item padding-horizontal-21 bg-white" v-for="(item, index) in loanTemplate" :key="index">
        <div class="item-money">
          <div class="money-left">
            <p class="left-title"><span></span><span class="font-24">金额 (元)</span></p>
            <p class="left-amount font-51">￥{{item.Amount}}</p>
          </div>
          <button class="money-apply button bg-blue" @click="gotoPage('wanna-borrow', item)"><div class="color-white font-24">申请</div></button>
        </div>
        <div class="item-detail padding-horizontal-30">
          <p class="detail-message font-27 color-light-grey">
            <span>到期还款金额：{{item.Amount}}元</span>
            <span>借款周期：{{item.Period}}天</span>
          </p>
          <p class="detail-message font-27 color-light-grey">
            <span>年利率：{{item.YearRate}}%</span>
            <span>其他费用：{{item.OtherCost}}元</span>
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- e 借条模板/出借模板 -->
</template>

<script>
// include dependence
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'IouTemplateComponent',
  data () {
    return {
      borrowDate: '',
      templateType: null,
      loanTemplate: [],
      title: {
        contentText: '借条模板'
      }
      // start params
      // end params
    }
  },
  components: {
    TitleComponent
    // include components
  },
  created () {
    console.log(Storage.borrowType)
    if (Storage.borrowType === 1) {
      this.title.contentText = '借条模板'
      this.templateType = 1
    }
    if (Storage.borrowType === 2) {
      this.title.contentText = '欠条模板'
      this.templateType = 0
    }
    this.init()
  },
  methods: {
    init () {
      Http.send({
        url: 'TemplateList',
        data: {
          token: Storage.token,
          phone: Storage.userInfo.account,
          type: this.templateType
        }
      }).success(data => {
        this.loanTemplate = data
      }).fail(data => {
      })
    },
    initDate (AddDayCount) {
      var date = new Date()
      date.setDate(date.getDate() + AddDayCount)
      var y = date.getFullYear()
      var m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.borrowDate = y + '-' + m + '-' + d
    },
    gotoPage (page, item) {
      this.initDate(item.Period)
      Storage.wannaInfo = {
        borrowAmount: item.Amount,
        ratePercent: item.YearRate,
        borrowPublish: '3',
        period: item.Period,
        otherCost: item.OtherCost,
        borrowDate: this.borrowDate
      }
      Router.push(page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./iou-template.scss";
</style>
