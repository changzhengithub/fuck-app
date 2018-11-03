module.exports = {
  content: '我的',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': false,
    'BM': false,
    'Btn': false,
    'Chat': true,
    'Check': false,
    'Citys': false,
    'Days': false,
    'Error': false,
    'Hasten': false,
    'Http': true,
    'Initial': false,
    'Mock': false,
    'Replace': false,
    'Router': true,
    'Sort': false,
    'Status': false,
    'Storage': true,
    'Time': false,
    'Type': false,
    'Url': false
  },
  components: {
    'billboard': `[
        {
          key: '收还款计划',
          icon: 'arrow-right',
          svg: 'shouhuankuanjihua',
          target: 'account-statistic',
          border: true
        },
        {
          key: '我的银行卡',
          icon: 'arrow-right',
          svg: 'wodeyinhangqia',
          target: 'my-bank-card',
          border: true
        },
        {
          key: '常见问题',
          icon: 'arrow-right',
          svg: 'changjianwenti',
          target: 'familar-question',
          border: true
        },
        {
          key: '在线客服',
          icon: 'arrow-right',
          svg: 'zaixiankefu1',
          border: true
        },
        {
          key: '授信',
          svg: 'shouxin',
          icon: 'arrow-right',
          target: 'credit',
          border: true
        },
        {
          key: '意见反馈',
          svg: 'yijianfankui',
          icon: 'arrow-right',
          target: 'feedback',
          border: true
        }
      ]`,
    'board': false,
    'button': false,
    'contact-list': false,
    'deadline': false,
    'detail-list': false,
    'image-bg': false,
    'inputs': false,
    'keyboard': false,
    'modal': false,
    'modals': false,
    'nav': false,
    'pay-password': false,
    'pull-refresh': false,
    'receipt': false,
    'tab': false,
    'tip': false,
    'title': false,
    'without': false,
    'work-card': false
  }
}
