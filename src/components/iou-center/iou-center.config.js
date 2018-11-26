module.exports = {
  content: '借条中心',
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
    'Status': true,
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
    'detail-list': false,
    'dialog': false,
    'image-bg': false,
    'inputs': false,
    'keyboard': false,
    'modal': false,
    'modals': false,
    'nav': `{
        content: ['谁欠我钱', '我欠谁钱', '待确认', '已还清', '已失效'],
        active: 'active'
      }`,
    'pay-password': false,
    'pull-refresh': 1,
    'receipt': 1,
    'tab': false,
    'tip': false,
    'title': `{
        contentText: '借条中心',
        rightText: '排序'
      }`,
    'without': 1,
    'work-card': false
  }
}
