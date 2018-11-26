module.exports = {
  content: '收支明细详情',
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
    'button': false,
    'contact-list': false,
    'deadline': false,
    'detail-list': `[
        {
          type: 'default',
          key: '类型',
          value: ''
        },
        {
          type: 'default',
          key: '时间',
          value: ''
        },
        {
          type: 'default',
          key: '说明',
          value: ''
        },
        {
          type: 'default',
          key: '余额',
          value: ''
        },
        {
          type: 'default',
          key: '其他',
          value: ''
        }
      ]`,
    'dialog': false,
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
        contentText: '收支明细详情'
      }`,
    'without': false,
    'work-card': false
  }
}
