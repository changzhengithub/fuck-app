module.exports = {
  content: '添加联系人',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': true,
    'BM': false,
    'Btn': false,
    'Chat': false,
    'Check': true,
    'Citys': false,
    'Days': false,
    'Error': true,
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
    'billboard': false,
    'board': false,
    'button': `{
        default: [{
          type: 'primary',
          text: '确认添加'
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
        content: '借条大师保障您的信息安全。',
        icon: 'dunpai'
      }`,
    'title': `{
        contentText: '添加联系人'
      }`,
    'without': false,
    'work-card': false
  }
}
