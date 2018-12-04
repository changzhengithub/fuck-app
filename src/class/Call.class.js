import Error from './Error.class.js'
export default class Call {
  // Netcall 实例
  static netcall = null
  // 通话的channelId
  static channelId = null
  static beCalling = false
  // 呼叫超时检查定时器
  static callTimer = null
  // 被呼叫超时检查定时器
  static beCallTimer = null
  // becalling 回调信息
  static beCalledInfo = null
  // 音频或视频通话
  static type = null
  // 是否处于通话流程中
  static netcallActive = false
  // 通话流程的另一方账户
  static netcallAccount = ''
  // 通话时长
  static netcallDuration = 0
  // 通话正式开始时间戳
  static netcallStartTime = 0
  // 通话时长定时器
  static netcallDurationTimer = null
  // 是否开启摄像头输入
  static deviceVideoInOn = true
  // 是否开启音频输入
  static deviceAudioInOn = true
  // 是否开启扬声器输出
  static deviceAudioOutOn = true
  // 是否全屏状态
  static isFullScreen = false
  // 是否切换到视频
  static requestSwitchToVideoWaiting = false
  static pushConfig = {
    enable: true,
    needBadge: true,
    needPushNick: true,
    pushContent: '',
    custom: '',
    pushPayload: '',
    sound: ''
  }
  static sessionConfig = {
    // eslint-disable-next-line
    videoQuality: WebRTC.CHAT_VIDEO_QUALITY_480P,
    // eslint-disable-next-line
    videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_NORMAL,
    recordVideo: false,
    recordAudio: false,
    highAudio: false
  }

  static init (nim) {
    let config = {
      nim: nim,
      container: document.getElementById('video-container'),
      remoteContainer: document.getElementById('video-remoteContainer')
    }
    if (window.WebRTC) {
      let NIM = window.NIM
      NIM.use(window.WebRTC)
      window.app.$store.commit('saveNetcall', window.WebRTC.getInstance(config))
      console.log(window.app.$store.state.netcall)
    }
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
      window.app.$store.commit('saveBeCalling', obj)
      this.beCalledInfo = obj
      // this.onBeCalling(obj)
      console.log('被叫收到呼叫的通知', obj)
    })
    // 主叫收到被叫接受的通知
    this.netcall.on('callAccepted', (obj) => {
      window.app.$store.commit('saveCallAccepted', obj)
      console.log('被叫接收呼叫', obj)
      // this.clearCallTimer()
      // this.onCallAccepted(obj)
    })
    // 主叫收到被叫拒绝的通知
    this.netcall.on('callRejected', (obj) => {
      console.log('被叫拒绝的通知', obj)
      window.app.$store.commit('saveCallRejected', obj)
      // this.clearCallTimer()
      // this.onCallingRejected()
    })
    // 收到挂断通知
    this.netcall.on('hangup', (obj) => {
      window.app.$store.commit('saveHangup', obj)
      console.log('收到挂断通知', obj)
      // this.onHangup(obj)
    })
    // 通话中收到远端的控制指令
    this.netcall.on('control', (obj) => {
      window.app.$store.commit('saveControl', obj)
      console.log('通话中收到远端的控制指令', obj)
      // this.onControl(obj)
    })
    // 对方接入webrtc的通知
    this.netcall.on('remoteTrack', function (obj) {
      window.app.$store.commit('saveRemoteTrack', obj)
      console.log('对方接入webrtc的通知', obj)
      // that.onJoinChannel(obj);
    })
    // sdk内部出现错误或者服务器反馈一些通知（无法继续进行通话）时，会触发该回调通知事件，这时开发者可以根据需要调用方法获取信息
    this.netcall.on('error', (obj) => {
      window.app.$store.commit('saveWebRTCError', obj)
      console.log('sdk反馈错误信息', obj)
    })
    // 音量大小实时回调通知
    this.netcall.on('audioVolume', (obj) => {
      window.app.$store.commit('saveAudioVolume', obj)
      console.log('音量', obj)
    })
  }

  /**
   * 主叫发起通话请求
   * @param {*} account
   * type: 通话类型 WebRTC.NETCALL_TYPE_AUDIO
   * account: 对方账号
   * pushConfig: 推送配置
   * sessionConfig: 通话配置
   */
  static sendCall (account, type) {
    this.refresh()
    return this.netcall.call({
      type: type,
      account: account,
      pushConfig: this.pushConfig,
      webrtcEnable: true,
      sessionConfig: this.sessionConfig
    })
  }

  /**
   * 接听音视频被呼叫
   * @param {*} beCalledInfo
   * beCalledInfo: beCalling接收的beCalledInfo
   */
  static callAcceptedResponse (beCalledInfo) {
    this.refresh()
    return this.netcall.response({
      accepted: true,
      beCalledInfo: beCalledInfo,
      sessionConfig: this.sessionConfig
    })
  }

  /**
   * 拒绝音视频被呼叫
   * @param {*} accepted
   * accepted: 回应类型，接听、拒绝
   * beCalledInfo: 呼叫信息，必传，该值可以在 beCalling 回调事件中获取）
   * sessionConfig: 通话配置内容
   */
  static callRejectResponse (beCalledInfo) {
    this.refresh()
    return this.netcall.response({
      accepted: false,
      beCalledInfo: beCalledInfo
    })
  }

  /**
   * 挂断音视频
   */
  static hangup () {
    this.refresh()
    this.netcall.hangup()
    console.log('结束通话')
  }

  /**
   * 发送相关指令
   * @param {*} control
   * control: 指令JSON
   */
  static control (control) {
    this.refresh()
    this.netcall.control(control)
  }

  /**
   * 开启麦克风
   */
  static startMicrophone () {
    this.refresh()
    return this.netcall.startDevice({
      // eslint-disable-next-line
      type: WebRTC.DEVICE_TYPE_AUDIO_IN
    })
  }

  /**
   * 关闭麦克风
   */
  static stopMicrophone () {
    this.refresh()
    return this.netcall.stopDevice({
      // eslint-disable-next-line
      type: WebRTC.DEVICE_TYPE_AUDIO_IN
    })
  }

  /**
   * 启动播放自己声音的设备
   */
  static startDeviceAudioOutLocal () {
    this.refresh()
    return this.netcall.startDevice({
      // eslint-disable-next-line
      type: WebRTC.DEVICE_TYPE_AUDIO_OUT_LOCAL
    })
  }

  /**
   * 停止播放自己声音的设备
   */
  static stopDeviceAudioOutLocal () {
    // eslint-disable-next-line
    return this.netcall.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_OUT_LOCAL)
  }

  /**
   * 启动播放对方声音的设备
   */
  static startDeviceAudioOutChat () {
    this.refresh()
    return this.netcall.startDevice({
      // eslint-disable-next-line
      type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
    })
  }

  /**
   * 停止播放对方声音的设备
   */
  static stopDeviceAudioOutChat () {
    // eslint-disable-next-line
    return this.netcall.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT)
  }

  /**
   * 启动摄像头设备
   */

  static startDeviceVideo () {
    return this.netcall.startDevice({
      // eslint-disable-next-line
      type: WebRTC.DEVICE_TYPE_VIDEO
    })
  }
  /**
   * 停止摄像头设备
   */
  static stopDeviceVideo () {
    // eslint-disable-next-line
    return this.netcall.stopDevice(WebRTC.DEVICE_TYPE_VIDEO)
  }

  /**
   * 开始WebRtc音视频连接
   */
  static startRtc () {
    return this.netcall.startRtc()
  }

  /**
   * 开启本地视频流
   */
  static startLocalStream () {
    return this.netcall.startLocalStream()
  }

  /**
   * 停止本地视频流
   */
  static stopLocalStream () {
    return this.netcall.stopLocalStream()
  }

  /**
   * 从音频模式切换为视频模式
   */
  static switchAudioToVideo () {
    return this.netcall.switchAudioToVideo()
  }

  /**
   * 从视频模式切换为音频模式
   */
  static switchVideoToAudio () {
    return this.netcall.switchVideoToAudio()
  }

  /**
   * 设置自己画面的尺寸
   */
  static setVideoViewSize (width, height) {
    return this.netcall.setVideoViewSize({
      width: width,
      height: height
    })
  }

  /**
   * 开启远程视频流
   * account: 对方账号
   */
  static startRemoteStream (account) {
    return this.netcall.startRemoteStream({
      account: account,
      node: document.getElementById('video-remoteContainer')
    })
  }

  /**
   * 停止远程视频流
   */
  static stopRemoteStream (account) {
    return this.netcall.stopRemoteStream({
      account: account,
      node: document.getElementById('video-remoteContainer')
    })
  }

  /**
   * 设置对方画面的尺寸
   */
  static setVideoViewRemoteSize (width, height) {
    return this.netcall.setVideoViewRemoteSize({
      width: width,
      height: height
    })
  }

  /**
   * 暂停播放自己的视频画面
   */
  static suspendLocalStream () {
    return this.netcall.suspendLocalStream()
  }

  /**
   * 继续播放自己的视频画面
   */
  static resumeLocalStream () {
    return this.netcall.resumeLocalStream()
  }

  /**
   * 暂停播放对方的视频画面
   */
  static suspendRemoteStream () {
    return this.netcall.suspendRemoteStream()
  }

  /**
   * 继续播放对方的视频画面
   */
  static resumeRemoteStream () {
    return this.netcall.resumeRemoteStream()
  }

  /**
   * 设置采集音量
   * @param {*} number
   * 实时设置己方音频采集大小, 0-255
   */
  static setCaptureVolume (number) {
    return this.netcall.setCaptureVolume(number)
  }

  /**
   * 设置播放音量
   * @param {*} number
   * 设置对方音量播放大小, 0-255
   */
  static setPlayVolume (account, number) {
    return this.netcall.setPlayVolume({
      account: account,
      volume: number
    })
  }

  /**
   * 不是当前会话的channelId
   * @param {*} obj
   * obj: 回调的obj保含channelId
   */

  static notCurrentChannelId (obj) {
    this.netcall.notCurrentChannelId(obj)
  }

  /**
   * 获取指定类型的所有设备
   * type: 可选类型
   */
  static getDevicesOfType (type) {
    return this.netcall.getDevicesOfType({
      type: type
    })
  }

  /**
   * 设置超时计时器
   * @param {*} second
   * second: 秒数
   */
  static overTime (second) {
    this.callTimer = setTimeout(() => {
      if (!this.netcall.callAccepted) {
        Error.show('超时未接通')
        this.hangup()
      }
    }, 1000 * second)
  }

  /**
   * 清除超时定时器
   */

  static clearCallTimer () {
    clearTimeout(this.callTimer)
  }

  static clearBeCallTimer () {
    clearTimeout(this.beCallTimer)
  }
}

// class Operation {
//   successCallback = null
//   failCallback = null
//   success (callback) {
//     this.successCallback = callback
//     return this
//   }

//   fail (callback) {
//     this.failCallback = callback
//     return this
//   }
// }
