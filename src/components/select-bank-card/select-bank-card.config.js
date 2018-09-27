module.exports = {
  content: '选择所属银行',
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
    'Http': false,
    'Mock': false,
    'Router': true,
    'Status': false,
    'Storage': true,
    'Time': false,
    'Type': false,
    'Url': false
  },
  components: {
    'billboard': `[
        {
          svg: 'gongshangyinhang',
          key: '中国工商银行',
          target: '0102'
        }, {
          svg: 'nongyeyinhang',
          key: '中国农业银行',
          target: '0103'
        }, {
          svg: 'zhongguoyinhang',
          key: '中国银行',
          target: '0104'
        }, {
          svg: 'jiansheyinhang',
          key: '中国建设银行',
          target: '0105'
        }, {
          svg: 'jiaotongyinhang',
          key: '交通银行',
          target: '0301'
        }, {
          svg: 'zhongxinyinhang',
          key: '中信银行',
          target: '0302'
        }, {
          svg: 'guangdayinhang',
          key: '中国光大银行',
          target: '0303'
        }, {
          svg: 'huaxiayinhang',
          key: '华夏银行',
          target: '0304'
        }, {
          svg: 'youchuyinhang',
          key: '邮政储蓄',
          target: '0403'
        }, {
          svg: 'xingyeyinhang',
          key: '兴业银行',
          target: '0309'
        }, {
          svg: 'zhaoshangyinhang',
          key: '招商银行',
          target: '0308'
        }, {
          svg: 'pinganyinhang',
          key: '平安银行股份有限公司',
          target: '0307  '
        }, {
          svg: 'guangdongfazhanyinhang',
          key: '广东发展银行',
          target: '0306'
        }, {
          svg: 'yinhang-shanghaipudongfazhan-',
          key: '上海浦东发展银行',
          target: '0310'
        }, {
          svg: 'zhongguominshengyinhang',
          key: '中国民生银行',
          target: '0305'
        }
      ]`,
    'board': false,
    'button': false,
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
    'tip': `{
        type: 'default',
        content: '常用'
      }`,
    'title': `{
        contentText: '选择所属银行'
      }`,
    'without': false,
    'work-card': false
  }
}
