module.exports = {
  content: '绑定银行卡',
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
    'Check': true,
    'Citys': false,
    'Days': false,
    'Error': false,
    'Hasten': false,
    'Http': false,
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
    'billboard': false,
    'board': false,
    'button': `{
        default: [{
          type: 'primary',
          text: '确认绑定'
        }]
      }`,
    'contact-list': false,
    'deadline': false,
    'detail-list': false,
    'image-bg': false,
    'inputs': 1,
    'keyboard': false,
    'modal': 1,
    'modals': false,
    'nav': false,
    'pay-password': false,
    'pull-refresh': false,
    'receipt': false,
    'tab': false,
    'tip': `{
        type: 'default',
        content: '提现密码，登录密码默认手机号后6位，你可在设置中修改'
      }`,
    'title': `{
        contentText: '绑定银行卡'
      }`,
    'without': false,
    'work-card': false
  }
}
