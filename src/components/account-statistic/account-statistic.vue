<template>
  <!-- s 收还款计划 -->
  <section class="account-statistic padding-top-126">
    <TitleComponent :title="title"></TitleComponent>
    <div class="statistic-title color-deep-grey bg-white border-bottom-1 padding-horizontal-30">
      <div>日期</div>
      <div>还款</div>
      <div>收款</div>
    </div>
    <ul class="statistic-list font-30 bg-white" v-if="statistic.length">
      <li class="list-item color-deep-black border-bottom-1 padding-horizontal-30" v-for="(item, index) in statistic" :key="index">
        <div>{{item.PlanDate}}</div>
        <div>{{item.RepaymentAmount}}</div>
        <div>{{item.IncomeAmount}}</div>
      </li>
    </ul>
    <div class="statistic-without bg-white" v-if="!statistic.length">
      <WithoutComponent></WithoutComponent>
    </div>
    <div class="statistic-count padding-horizontal-30 font-30 color-deep-black bg-white">
      <div>合计</div>
      <div>
        <p>{{TotalRepaymentAmount}}万</p>
      </div>
      <div>{{TotalIncomeAmount}}万</div>
    </div>
  </section>
  <!-- e 收还款计划 -->
</template>

<script>
// include dependence
import Http from '../../class/Http.class.js'
import TitleComponent from '../../module/title/title.vue'
import WithoutComponent from '../../module/without/without.vue'
export default {
  name: 'AccountStatisticComponent',
  data () {
    return {
      statistic: [],
      pageIndex: 1,
      TotalIncomeAmount: 0,
      TotalRepaymentAmount: 0,
      // start params
      'title': {
        contentText: '收还款'
      }
      // end params
    }
  },
  components: {
    TitleComponent,
    WithoutComponent
    // include components
  },
  methods: {
    init () {
      Http.send({
        url: 'BorrowList',
        data: {
          token: Storage.token,
          userPhone: Storage.phone,
          pageIndex: this.pageIndex,
          pageSize: 10
        }
      }).success(data => {
        this.formatData(data)
      }).fail(data => {
      })
    },
    formatData (data) {
      this.TotalIncomeAmount = data.TotalIncomeAmount
      this.TotalRepaymentAmount = data.TotalRepaymentAmount
      this.statistic = data.Rows
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./account-statistic.scss";
</style>
