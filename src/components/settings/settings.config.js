module.exports = {
  content: '设置',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': true,
    'BM': false,
    'Btn': false,
    'Call': false,
    'Chat': false,
    'Check': false,
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
    'billboard': `[
        {
          type: 'guide',
          key: '了解我们',
          icon: 'arrow-right',
          target: ''
        },
        {
          type: 'guide',
          key: '黑名单',
          icon: 'arrow-right',
          target: 'black-list'
        },
        {
          type: 'guide',
          key: '意见反馈',
          icon: 'arrow-right',
          target: 'feedback'
        }
      ]`,
    'board': false,
    'button': `{
        default: [{
          type: 'wran',
          text: '安全退出'
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
        contentText: '设置'
      }`,
    'without': false,
    'work-card': false
  }
}
