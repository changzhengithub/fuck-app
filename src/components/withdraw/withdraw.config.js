module.exports = {
  content: '提现',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': false,
    'BM': true,
    'Btn': false,
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
    'Router': false,
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
        default: [{
          type: 'primary',
          text: '提现'
        }]
      }`,
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
    'title': `{
        contentText: '提现'
      }`,
    'without': false,
    'work-card': false
  }
}
