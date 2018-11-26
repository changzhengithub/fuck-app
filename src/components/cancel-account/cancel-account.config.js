module.exports = {
  content: '销账',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': false,
    'BM': false,
    'Btn': false,
    'Call': false,
    'Chat': false,
    'Check': true,
    'Citys': false,
    'Days': false,
    'Error': false,
    'Hasten': false,
    'Http': true,
    'Initial': false,
    'Mock': false,
    'Replace': false,
    'Router': false,
    'Sort': false,
    'Status': false,
    'Storage': true,
    'Time': false,
    'Type': false,
    'Url': false
  },
  components: {
    'billboard': false,
    'board': `'center'`,
    'button': `{
        default: [{
          type: 'primary',
          text: '提交'
        }]
      }`,
    'contact-list': false,
    'deadline': false,
    'detail-list': false,
    'dialog': false,
    'image-bg': false,
    'inputs': `1`,
    'keyboard': false,
    'modal': false,
    'modals': false,
    'nav': false,
    'pay-password': false,
    'pull-refresh': false,
    'receipt': false,
    'tab': false,
    'tip': `{
        type: 'default',
        content: '已阅读相关协议',
        icon: 'xuanze',
        selected: 'true'
      }`,
    'title': `{
        contentText: '销账'
      }`,
    'without': false,
    'work-card': false
  }
}
