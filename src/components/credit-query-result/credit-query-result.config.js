module.exports = {
  content: '查询结果',
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
    'Http': false,
    'Initial': false,
    'Mock': false,
    'Replace': true,
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
    'button': false,
    'contact-list': false,
    'deadline': false,
    'detail-list': `[
        {
          type: 'default',
          key: '总逾期笔数',
          value: '10笔'
        },
        {
          type: 'default',
          key: '总逾期金额',
          value: '8848.00元'
        },
        {
          type: 'default',
          key: '最长逾期天数',
          value: '58天'
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
    'tip': `{
        type: 'center',
        content: '查询结果'
      }`,
    'title': `{
        contentText: '查询结果'
      }`,
    'without': false,
    'work-card': false
  }
}
