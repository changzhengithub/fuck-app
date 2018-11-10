export default class Call {
  static netcall = null
  static successCallback = null
  static blacklistAccounts = null
  static beCalledInfo = null

  static init (nim) {
    let config = {
      nim: nim,
      container: document.getElementById('video-container'),
      remoteContainer: document.getElementById('video-remoteContainer'),
      debug: true
    }
    if (window.WebRTC) window.app.$store.commit('saveNetcall', window.WebRTC.getInstance(config))
    this.initNetcallEvent()
  }
  static refresh () {
    this.netcall = window.app.$store.state.netcall
  }

  /** netcall监听事件 */
  static initNetcallEvent () {
    this.refresh()

    // 被叫收到呼叫的通知
    this.netcall.on('beCalling', (obj) => {
      this.beCalledInfo = obj
      // this.onBeCalling(obj)
    })
    // 主叫收到被叫接受的通知
    this.netcall.on('callAccepted', (obj) => {
      console.log(obj)
      // this.onCallAccepted(obj)
    })
    // 主叫收到被叫拒绝的通知
    this.netcall.on('callRejected', (obj) => {
      console.log(obj)
      // this.onCallingRejected(obj)
    })
    // 收到挂断通知
    this.netcall.on('hangup', (obj) => {
      console.log(obj)
      // this.onHangup(obj)
    })
    // 通话中收到远端的控制指令
    this.netcall.on('control', (obj) => {
      console.log(obj)
      // this.onControl(obj)
    })
    // sdk内部出现错误或者服务器反馈一些通知（无法继续进行通话）时，会触发该回调通知事件，这时开发者可以根据需要调用方法获取信息
    this.netcall.on('error', (obj) => {
      console.log('sdk反馈错误信息', obj)
    })
    // 音量大小实时回调通知
    this.netcall.on('audioVolume', (obj) => {
      console.log('音量', obj)
    })
  }

  static pushConfig = {
    enable: true,
    needBadge: true,
    needPushNick: true,
    pushContent: '',
    custom: '测试自定义数据',
    pushPayload: '',
    sound: '',
    forceKeepCalling: 0
  }

  static sessionConfig = {
    videoQuality: 'Netcall.CHAT_VIDEO_QUALITY_HIGH',
    videoFrameRate: 'Netcall.CHAT_VIDEO_FRAME_RATE_15',
    videoBitrate: 0,
    recordVideo: false,
    recordAudio: false,
    highAudio: false,
    bypassRtmp: false,
    rtmpUrl: '',
    rtmpRecord: false,
    splitMode: 'Netcall.LAYOUT_SPLITLATTICETILE'
  }
  /**
   * 主叫发起通话请求
   * @param {*} account
   * type: 通话类型
   * account: 对方账号
   * pushConfig: 推送配置
   * sessionConfig: 通话配置
   */
  static call (account) {
    this.refresh()
    this.netcall.call({
      type: 'Netcall.NETCALL_TYPE_VIDEO',
      account: account,
      pushConfig: this.pushConfig,
      sessionConfig: this.sessionConfig
    }).then((obj) => {
      console.log('call success', obj)
    }).catch((err) => {
      // 被叫不在线
      if (err.event.code === 11001) {
        console.log('callee offline', err)
      }
    })
  }

  /**
   * 设置超时计时器
   * @param {*} second
   * second: 秒数
   */
  static overTime (second) {
    setTimeout(() => {
      if (!this.netcall.callAccepted) {
        console.log('超时未接听')
        // this.hangup()
      }
    }, 1000 * second)
  }

  /**
   * 被叫接听
   * @param {*} accepted
   * accepted: 回应类型，接听、拒绝
   * beCalledInfo: 呼叫信息，必传，该值可以在 beCalling 回调事件中获取）
   * sessionConfig: 通话配置内容
   */
  static callResponse () {
    this.netcall.response({
      accepted: true,
      beCalledInfo: this.beCalledInfo,
      sessionConfig: this.sessionConfig
    }).catch((err) => {
      // reject()
      console.log('接听失败', err)
    })
  }

  static control () {}
}
