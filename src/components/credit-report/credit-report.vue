<template>
  <!-- s 信用报告 -->
  <section class="credit-report padding-top-126">
    <TitleComponent :title="title" @OTHER_EVENT="sendReport"></TitleComponent>
    <div class="report-title padding-horizontal-30 font-30"><span>征信审核报告</span></div>
    <ul class="report-default padding-horizontal-30 font-30">
      <li class="default-item">
        <span>个人基本信息</span>
      </li>
      <li class="default-item">
        <span>姓名:</span>
        <span>{{reportList.names}}</span>
      </li>
      <li class="default-item">
        <span>性别:</span>
        <span>{{reportList.gender}}</span>
      </li>
      <li class="default-item">
        <span>身份证号:</span>
        <span>{{reportList.id_number}}</span>
      </li>
      <li class="default-item">
        <span>住址:</span>
        <span>{{reportList.address}}</span>
      </li>
      <li class="default-item">
        <span>报告时间:</span>
        <span>{{reportList.last_modified_time}}</span>
      </li>
    </ul>
    <div class="report-risk">
      <div class="risk-title padding-horizontal-21">
        <p class="font-24 color-black padding-horizontal-21">风险排查</p>
      </div>
      <ul class="risk-list padding-horizontal-30">
        <li class="list-item">
          <span class="itme-key">[评估模型得分]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[风险等级]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[用户特性]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[芝麻信用分]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[紧急联系人]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[通话前十联系人]</span>
          <ul class="item-group">
            <li class="group-item" v-for="(item, index) in reportList.callinfo_10" :key="index"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[使用手机号个数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[关联用户数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[其他关联设备数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[法院失信]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[网贷失信]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[活体攻击行为]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[名下银行卡数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[可疑设备]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[活体攻击设备]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[实际借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近3月实际借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近1月实际借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近6月实际借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[申请借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[还款次数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近3月还款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近3月申请借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近6月申请借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近1月还款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[还款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近6月还款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
        <li class="list-item">
          <span class="itme-key">[近1月申请借款平台数]</span>
          <ul class="item-group">
            <li class="group-item"></li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
  <!-- e 信用报告 -->
</template>

<script>
// include dependence
import Account from '../../class/Account.class.js'
import Chat from '../../class/Chat.class.js'
import Http from '../../class/Http.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'CreditReportComponent',
  data () {
    return {
      reportList: null,
      // start params
      'title': {
        contentText: '信用报告',
        rightText: '发送'
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
      Http.send({
        url: 'QueryUDCreditReport',
        data: {
          Token: Storage.token,
          key: Account.ID
        }
      }).success(data => {
        this.reportList = data
      }).fail(data => {
      })
    },
    sendReport () {
      let content = {
        target: Chat.target.id,
        id: Account.ID,
        title: Account.name + '的信用报告',
        money: Account.name + '的信用报告'
      }
      Chat.creditReport(content).success(data => {
        console.log(data)
        Router.push('chat')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./credit-report.scss";
</style>
