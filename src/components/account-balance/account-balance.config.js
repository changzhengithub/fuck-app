module.exports = {
  content: '账单明细',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': false,
    'BM': true,
    'Btn': false,
    'Call': false,
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
    'Time': true,
    'Type': false,
    'Url': false
  },
  components: {
    'billboard': false,
    'board': false,
    'button': `{
        group: [
          {
            text: '提现',
            class: 'primary'
          },
          {
            text: '充值',
            class: 'default'
          }
        ]
      }`,
    'contact-list': false,
    'deadline': false,
    'detail-list': 1,
    'image-bg': false,
    'inputs': false,
    'keyboard': false,
    'modal': false,
    'modals': false,
    'nav': false,
    'pay-password': false,
    'pull-refresh': 1,
    'receipt': false,
    'tab': false,
    'tip': false,
    'title': `{
        contentText: '账户余额',
        rightText: '收支明细'
      }`,
    'without': 1,
    'work-card': false
  }
}
