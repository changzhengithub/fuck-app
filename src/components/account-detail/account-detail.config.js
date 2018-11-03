module.exports = {
  content: '当日收还款详情',
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
    'billboard': `[
        {
          type: 'guide',
          key: '应收款(元)',
          value: '',
          dot: true
        },
        {
          type: 'guide',
          key: '应还款(元)',
          value: '',
          dot: true
        }
      ]`,
    'board': false,
    'button': false,
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
    'receipt': `[]`,
    'tab': false,
    'tip': `{
        type: 'center',
        content: ''
      }`,
    'title': `{
        contentText: '2018年5月17日收还款'
      }`,
    'without': false,
    'work-card': false
  }
}
