module.exports = {
  content: '催收详情',
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
    'Hasten': true,
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
    'board': false,
    'button': false,
    'contact-list': false,
    'deadline': false,
    'detail-list': `[
        {
          type: 'default',
          key: '催收金额',
          value: ''
        }, {
          type: 'default',
          key: '打赏比例',
          value: ''
        }, {
          type: 'default',
          key: '到期时间',
          value: ''
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
        contentText: '催收详情'
      }`,
    'without': false,
    'work-card': false
  }
}
