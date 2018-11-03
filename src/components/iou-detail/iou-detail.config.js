module.exports = {
  content: '借条详情',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': false,
    'BM': true,
    'Btn': true,
    'Chat': false,
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
    'Type': true,
    'Url': false
  },
  components: {
    'billboard': false,
    'board': false,
    'button': false,
    'contact-list': false,
    'deadline': false,
    'detail-list': `[
        {
          type: 'default',
          key: '借出本金：',
          value: ''
        },
        {
          type: 'default',
          key: '年利率：',
          value: ''
        },
        {
          type: 'default',
          key: '借款日：',
          value: ''
        },
        {
          type: 'default',
          key: '到期日：',
          value: ''
        },
        {
          type: 'default',
          key: '其他费用：',
          value: '0元'
        }
      ]`,
    'image-bg': false,
    'inputs': false,
    'keyboard': 1,
    'modal': 1,
    'modals': false,
    'nav': false,
    'pay-password': `[]`,
    'pull-refresh': false,
    'receipt': false,
    'tab': false,
    'tip': `{
        type: 'center',
        content: '请输入支付密码'
      }`,
    'title': `{
        contentText: '借条详情'
      }`,
    'without': false,
    'work-card': false
  }
}
