module.exports = {
  content: '出借信息',
  router: true,
  vuex: {
    'mutations': false,
    'state': false
  },
  class: {
    'Data': false,
    'Http': false,
    'Time': false,
    'Url': false
  },
  components: {
    'billboard-list': false,
    'board': false,
    'button': `{
        default: [
          {
            type: 'primary',
            text: '展期'
          },
          {
            type: 'default',
            text: '销账'
          }
        ]
      }`,
    'deadline': false,
    'detail-list': `[
        {
          type: 'default',
          key: '本金：',
          value: '0元'
        },
        {
          type: 'default',
          key: '年利率：',
          value: '10%'
        },
        {
          type: 'default',
          key: '借款日：',
          value: '2017-06-18'
        },
        {
          type: 'default',
          key: '到期日：',
          value: '2017-07-18'
        },
        {
          type: 'default',
          key: '其他费用：',
          value: '50元'
        }
      ]`,
    'image-bg': false,
    'inputs': false,
    'modals': false,
    'nav': false,
    'pay-password': false,
    'receipt': false,
    'tab': false,
    'tip': `{
        type: 'center',
        content: '还有7天到期',
        icon: 'chuyin'
      }`,
    'title': `{
        contentText: '出借信息'
      }`,
    'work-card': `{
        portrait: '头像地址',
        name: '李艳霞',
        money: '1500.00',
        tip: '对方还款后，资金自动转入您的余额'
      }`
  }
}