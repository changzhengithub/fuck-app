module.exports = {
  content: '我要借款',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': false,
    'BM': false,
    'Btn': false,
    'Check': true,
    'Citys': false,
    'Error': true,
    'Hasten': false,
    'Http': true,
    'Mock': false,
    'Router': true,
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
          text: '发布借条'
        }]
      }`,
    'deadline': 1,
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
    'tip': `{
        type: 'default',
        content: '已同意协议',
        protocol: '借条大师协议',
        icon: 'jindu',
        selected: 'true'
      }`,
    'title': `{
        contentText: '我要借款'
      }`,
    'without': false,
    'work-card': false
  }
}
