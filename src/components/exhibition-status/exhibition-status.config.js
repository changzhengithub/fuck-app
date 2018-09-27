module.exports = {
  content: '展期状态',
  router: true,
  vuex: {
    mutations: false,
    state: false
  },
  class: {
    'Account': false,
    'BM': false,
    'Btn': false,
    'Chat': false,
    'Check': false,
    'Citys': false,
    'Days': false,
    'Error': false,
    'Hasten': false,
    'Http': true,
    'Mock': false,
    'Router': false,
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
          text: '确认'
        }]
      }`,
    'deadline': false,
    'detail-list': `[
        {
          type: 'default',
          key: '展期日期',
          value: '2017年12月14日'
        },
        {
          type: 'default',
          key: '展期利率',
          value: '10%'
        }
      ]`,
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
        contentText: '展期状态'
      }`,
    'without': false,
    'work-card': false
  }
}
