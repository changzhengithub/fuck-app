<template>
  <!-- s 借出 -->
  <section class="lend-list padding-top-126">
    <TitleComponent :title="title"></TitleComponent>
    <NavComponent class="list-nav font-30 bg-white" :nav="nav" @SELECTED_EVENT="toggleType"></NavComponent>
    <BoardComponent class="list-board color-white padding-left-30">
      <div class="board-tip font-27">
        <p class="margin-right-15">当前金额（元）</p>
        <i class="iconfont icon-chuyin font-39"></i>
      </div>
      <div class="font-72">{{TotalAmount}}</div>
      <div class="font-27">应付利息 {{TotalInterest}}元</div>
      <ImageBgComponent :imageBg="imageBg"></ImageBgComponent>
    </BoardComponent>
    <div class="list-content">
      <PullRefreshComponent :direction="'top'" v-if="receipt.length">
        <ReceiptComponent :receipt="item" v-for="(item, index) in receipt" :key="index" @HEADER_EVENT="chat(item)" @DETAIL_EVENT="showDetail(item.id)"></ReceiptComponent>
      </PullRefreshComponent>
      <WithoutComponent  v-if="!receipt.length"></WithoutComponent>
    </div>
  </section>
  <!-- e 借出 -->
</template>

<script>
// include dependence
import Http from '../../class/Http.class.js'
import Status from '../../class/Status.enum.js'
import Storage from '../../class/Storage.class.js'
import Type from '../../class/Type.enum.js'
import BoardComponent from '../../module/board/board.vue'
import ImageBgComponent from '../../module/image-bg/image-bg.vue'
import NavComponent from '../../module/nav/nav.vue'
import PullRefreshComponent from '../../module/pull-refresh/pull-refresh.vue'
import ReceiptComponent from '../../module/receipt/receipt.vue'
import TitleComponent from '../../module/title/title.vue'
import WithoutComponent from '../../module/without/without.vue'
export default {
  name: 'LendListComponent',
  data () {
    return {
      TotalAmount: 0,
      TotalInterest: 0,
      type: 1,
      pageIndex: 1,
      // start params
      'imageBg': require('../../assets/images/lend.png'),
      'nav': {
        content: ['当前', '已放款', '已逾期', '已还清', '已失效'],
        active: ''
      },
      'pullRefresh': '',
      'receipt': [],
      'title': {
        contentText: '借出'
      }
      // end params
    }
  },
  components: {
    BoardComponent,
    ImageBgComponent,
    NavComponent,
    ReceiptComponent,
    TitleComponent,
    WithoutComponent,
    PullRefreshComponent
    // include components
  },
  methods: {
    init () {
      Http.send({
        url: 'LendList',
        data: {
          token: Storage.token,
          userPhone: Storage.phone,
          type: this.type,
          pageIndex: this.pageIndex,
          pageSize: 10
        }
      }).success(data => {
        console.log(data)
        this.formatData(data)
      }).fail(data => {
      })
    },
    formatData (data) {
      this.TotalAmount = data.TotalAmount
      this.TotalInterest = data.TotalInterest
      this.receipt = []
      data.Rows.forEach(item => {
        let receipt = {
          name: item.TargetName,
          type: Type[item.Type],
          portrait: 'http://iph.href.lu/150x150',
          rate: item.YearRate,
          start: item.LoanDate,
          end: item.RepaymentDate,
          money: item.Amount,
          status: Status[item.State],
          id: item.Id,
          mode: item.Mode,
          icon: 'xuanze'
        }
        this.receipt.push(receipt)
      })
    },
    toggleType (index) {
      this.type = ++index
      console.log(this.type)
      this.pageIndex = 1
      this.init()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./lend-list.scss";
</style>
