const state = {
  nim: null,
  netcall: null,
  sdk: false,
  chat: null,
  token: null,
  phone: null,
  name: null,
  id: null,
  oid: null,
  origin: null,
  paySet: null,
  card: {},
  publishObject: null,
  purpose: null,
  payedMoney: null,
  gapMoney: null,
  borrowId: null,
  usableMoney: null,
  credtiQuery: null,
  opinion: null,
  account: {},
  complianPhone: null,
  info: null,
  error: {
    modal: false,
    message: ''
  },
  iframe: null,
  bank: null,
  forget: null,
  wannaInfo: null,
  userInfo: null,
  chatObject: null,
  message: null,
  sessions: null,
  updatesession: null,
  friends: null,
  businessCard: null,
  messages: null,
  sessionId: null,
  loanTemplate: null,
  borrowType: null,
  blackList: [], // 黑名单
  verifyMessage: null,
  sysMsgUnread: null, // 系统通知未读数
  customMsg: null, // 自定义消息
  beCalling: null, // 音视频信息
  callRejected: null, // 主叫收到被叫拒绝的通知
  callAccepted: null, // 主叫收到被叫接受的通知
  hangup: null, // 收到挂断通知
  control: null, // 通话中收到远端的控制指令
  webRTCError: null, // sdk内部出现错误或者服务器反馈一些通知
  audioVolume: null, // 音量大小实时回调通知
  remoteTrack: null, // 对接入webrtc通知
  callType: null, // 发起音视频通话类型
  callMessage: null, // 通话时的消息
  callerAckSync: null
}
export default state
