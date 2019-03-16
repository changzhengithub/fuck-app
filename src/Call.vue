<template>
  <section class="call" v-if="callShow">
    <section class="call-inform" v-if="!videoCallShow && !voiceCallShow">
      <div class="voice-info" v-if="isCallType">
        <div class="info-portrait">
          <img src="@/assets/images/master.png">
        </div>
        <p class="info-account font-39 color-white">17730127131</p>
        <p class="info-waiting font-30 color-white">请求通话</p>
      </div>
      <div class="inform-video" v-if="!isCallType">
        <div class="video-info">
          <div class="info-portrait">
            <img src="@/assets/images/master.png">
          </div>
          <div class="info-detail">
            <p class="info-account font-39 color-white">17730127131</p>
            <p class="info-waiting font-30 color-white">等待对方接听...</p>
          </div>
        </div>
      </div>
      <div class="inform-switch">
        <div class="switch-item bg-red" @click="rejectCall">
          <span class="font-36 color-white">拒绝</span>
        </div>
        <div class="switch-item bg-blue" @click="acceptCall">
          <span class="font-36 color-white">接受</span>
        </div>
      </div>
    </section>
    <!-- s 语音 -->
    <section class="call-voice" v-if="voiceCallShow">
      <div class="voice-top">
        <div class="top-switch" v-if="isWebRTCConnect" @click="switchVideo">
          <div class="switch-video color-white font-30">
            <i class="iconfont icon-xiaolian"></i>
            <span>切换视频</span>
          </div>
        </div>
        <div class="top-info">
          <div class="info-portrait">
            <img src="@/assets/images/master.png">
          </div>
          <p class="info-account font-39 color-white">17730127131</p>
          <div class="info-accept" v-if="isWebRTCConnect">
            <p class="accept-video font-39 color-white" v-if="waitCallVideo">对方邀请你进行视频聊天...</p>
            <p class="accept-time font-39 color-white">{{netcallDurationText}}</p>
            <p class="accept-network font-33 color-white">网络: 111</p>
          </div>
          <p class="info-waiting font-30 color-white" v-if="!isWebRTCConnect && waitCallVideo">等待对方接听...</p>
        </div>
      </div>
      <div class="voice-answer" v-if="!waitCallVideo">
        <div class="answer-switch">
          <button class="switch-item" @click="openAudioIn">
            <div class="item-btn">
              <i class="iconfont icon-xiaolian"></i>
              <span>静音</span>
            </div>
          </button>
          <button class="switch-item" @click="openAudioOut">
            <div class="item-btn">
              <i class="iconfont icon-xiaolian"></i>
              <span>扬声器</span>
            </div>
          </button>
          <button class="switch-item">
            <div class="item-btn">
              <i class="iconfont icon-xiaolian"></i>
              <span>录制</span>
            </div>
          </button>
        </div>
        <div class="answer-over" @click="hangup">
          <span class="font-36 color-white">结束通话</span>
        </div>
      </div>
      <div class="voice-waiting" v-if="waitCallVideo">
        <div class="waiting-item bg-red" @click="rejectCallVideo">
          <span class="font-36 color-white">拒绝</span>
        </div>
        <div class="waiting-item bg-blue" @click="acceptCallVideo">
          <span class="font-36 color-white">开启</span>
        </div>
      </div>
    </section>
    <!-- e  -->
    <!-- s 视频 -->
    <section class="call-video" v-if="videoCallShow">
      <div class="video-wait" v-if="waitSwitchVideo">
        <p class="font-39 color-white">等待对方接听</p>
      </div>
      <div class="video-info" v-if="!isWebRTCConnect">
        <div class="info-portrait">
          <img src="@/assets/images/master.png">
        </div>
        <div class="info-detail">
          <p class="info-account font-39 color-white">17730127131</p>
          <p class="info-waiting font-30 color-white">等待对方接听...</p>
        </div>
      </div>
      <div class="video-switch font-33 color-white" v-if="isWebRTCConnect" @click="switchVoice">
        <i class="iconfont icon-xiaolian"></i>
        <span>切换音频</span>
      </div>
      <div class="video-time font-33 color-white" v-if="isWebRTCConnect"><span>{{netcallDurationText}}</span></div>
      <div :class="isPlay ? 'video-remoteContainer' : 'video-myself'" id="video-container" @click="updataLocalSize"></div>
      <div :class="isRemotePlay ? 'video-remoteContainer' : 'video-myself'" id="video-remoteContainer" @click="updataRemoteSize"></div>
      <div class="video-footer bg-white">
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item">
          <i class="iconfont icon-video"></i>
        </div>
        <div class="footer-item bg-red color-white" @click="hangup">
          <i class="iconfont icon-video"></i>
        </div>
      </div>
    </section>
    <!-- e  -->
    <!-- <CallVideoComponent v-if="videoCallShow" :isWebRTCConnect="isWebRTCConnect" :waitSwitchVideo="waitSwitchVideo" :netcallDurationText="netcallDurationText" @CANCEL_VIDEO_EVENT="hangup" @SWITCH_VOICE_EVENT="switchVoice" @REMOTE_EVENT="remoteData"  @UPDATA_LOCAL_EVENT="updataLocalSize" @UPDATA_REMOTE_EVENT="updataRemoteSize"></CallVideoComponent> -->
    <!-- <CallVoiceComponent v-if="voiceCallShow" :waitCallVideo="waitCallVideo" :isWebRTCConnect="isWebRTCConnect" :netcallDurationText="netcallDurationText" @CANCEL_VOICE_EVENT="hangup" @SWITCH_VIDEO_EVENT="switchVideo" @REJECT_CALL_VIDEO_EVENT="rejectCallVideo" @ACCEPT_CALL_VIDEO_EVENT="acceptCallVideo"></CallVoiceComponent> -->
  </section>
</template>

<script>
import Account from './class/Account.class.js'
import Call from './class/Call.class.js'
import Error from './class/Error.class.js'
import Storage from './class/Storage.class.js'
import CallVoiceComponent from './components/call-voice/call-voice.vue'
import CallVideoComponent from './components/call-video/call-video.vue'
import DialogComponent from './module/dialog/dialog.vue'
import ModalComponent from './module/modal/modal.vue'
export default {
  name: 'Modal',
  data () {
    return {
      dialog: {
        type: 'double',
        title: ''
      },
      deviceAudioOutOn: false, // 关闭扬声器
      deviceAudioInOn: false, // 关闭麦克风
      isPlay: false,
      isRemotePlay: true,
      localWidth: 0,
      localHeight: 0,
      remoteWidth: 0,
      remoteHeight: 0,
      waitSwitchVideo: false, // 切换到视频等待
      waitCallVideo: false, // 发起视频请求
      callShow: false,
      requestSwitchToVideoWaiting: false,
      isWebRTCConnect: false,
      voiceCallShow: false,
      videoCallShow: false,
      callTimer: null,
      netcall: null,
      beCalledInfo: null,
      channelId: null,
      beCalling: false, // 被呼叫中
      calling: false, // 通话中
      callType: null, // 通话类型
      beCallTimer: null,
      netcallDurationText: null, // 通话时间
      netcallDurationTimer: null, // 通话时间倒计时
      acceptAndWait: false, // 接收等待通话
      isCallType: false,
      personalInfo: null,
      modalShow: false
    }
  },
  components: {
    ModalComponent,
    CallVideoComponent,
    CallVoiceComponent,
    DialogComponent
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.netcall = this.$store.state.netcall
    },
    // 点击扬声器控制按钮
    openAudioOut () {
      if (this.deviceAudioOutOn) {
        Call.stopDeviceAudioOutLocal().then(() => {
          this.deviceAudioOutOn = false
          Error.show('关闭扬声器')
        })
      } else {
        this.startOtherVoice()
        this.deviceAudioOutOn = true
      }
    },
    // 点击麦克风
    openAudioIn () {
      if (this.deviceAudioInOn) {
        Call.stopMicrophone().then(() => {
          this.deviceAudioInOn = false
          Error.show('关闭麦克风')
        })
      } else {
        this.startAudio()
        this.deviceAudioInOn = true
      }
    },
    getVoideSize () {
      console.log(document.getElementById('video-remoteContainer'))
      this.remoteWidth = document.getElementById('video-remoteContainer').offsetWidth
      this.remoteHeight = document.getElementById('video-remoteContainer').offsetHeight
      this.localWidth = document.getElementById('video-container').offsetWidth
      this.localHeight = document.getElementById('video-container').offsetHeight
    },
    updataLocalSize () {
      if (this.isPlay) return
      this.isPlay = true
      this.isRemotePlay = false
      Call.setVideoViewSize(this.remoteWidth, this.remoteHeight)
      Call.setVideoViewRemoteSize(this.localWidth, this.localHeight)
    },
    updataRemoteSize () {
      if (this.isRemotePlay) return
      this.isRemotePlay = true
      this.isPlay = false
      Call.setVideoViewSize(this.localWidth, this.localHeight)
      Call.setVideoViewRemoteSize(this.remoteWidth, this.remoteHeight)
    },
    // 视频通话
    videoCall () {
      // eslint-disable-next-line
      // Call.getDevicesOfType(WebRTC.DEVICE_TYPE_AUDIO_IN).then((data) => {
      //   console.log('获取成功', data)
      // if (!data.video.length) {
      //   Error.show('没有摄像头,转为音频')
      //   this.voiceCall()
      //   return
      // }
      this.callShow = true
      this.voiceCallShow = false
      this.videoCallShow = true
      // eslint-disable-next-line
      Call.sendCall(Storage.userInfo.account, WebRTC.NETCALL_TYPE_VIDEO).then(data => {
        console.log('发送通话成功，等待对方接听')
        this.init()
        console.log(this.netcall)
        console.log(data)
        this.callTimer = setTimeout(() => {
          if (!this.netcall.callAccepted) {
            Error.show('超时未接通')
            this.hangup()
          }
        }, 1000 * 30)
      }).catch(data => {
        if (data && data.event.code === 11001) {
          Error.show('发起音视频通话请求失败，对方不在线')
          setTimeout(() => {
            this.hangup()
          }, 2000)
        } else {
          Error.show(data.event.message)
          setTimeout(() => {
            this.hangup()
          }, 2000)
        }
        // })
      }).catch((err) => {
        this.callShow = false
        console.log('获取失败', err)
      })
    },
    // 音频通话
    voiceCall () {
      this.callShow = true
      this.videoCallShow = false
      this.voiceCallShow = true
      // eslint-disable-next-line
      Call.sendCall(Storage.userInfo.account, WebRTC.NETCALL_TYPE_AUDIO).then(data => {
        console.log('发送通话成功，等待对方接听')
        this.init()
        console.log(this.netcall)
        console.log(data)
        this.callTimer = setTimeout(() => {
          if (!this.netcall.callAccepted) {
            Error.show('超时未接通')
            this.hangup()
          }
        }, 1000 * 30)
      }).catch(data => {
        if (data && data.event.code === 11001) {
          Error.show('发起音视频通话请求失败，对方不在线')
          setTimeout(() => {
            this.hangup()
          }, 2000)
        } else {
          Error.show(data.event.message)
          setTimeout(() => {
            this.hangup()
          }, 2000)
        }
      })
    },
    // 同意通话
    acceptCall () {
      clearTimeout(this.beCallTimer)
      Call.callAcceptedResponse(this.beCalledInfo).then(() => {
        console.log('同意对方音视频请求成功')
        this.calling = true
        if (this.isCallType) {
          this.voiceCallShow = true
        } else {
          this.videoCallShow = true
        }
        // 加个定时器 处理点击接听了 实际上对面杀进程了，没有callAccepted回调
        this.acceptAndWait = true
        setTimeout(() => {
          if (this.acceptAndWait) {
            console.log('通话建立过程超时')
            this.hangup()
            this.acceptAndWait = false
          }
        }, 45 * 1000)
      }).catch(err => {
        console.log('同意对方音视频通话失败，转为拒绝', err)
        Call.control({
          channelId: this.beCalledInfo.channelId,
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
        })
        this.hangup()
        this.beCalledInfo = null
      })
    },
    // 拒绝通话
    rejectCall () {
      clearTimeout(this.beCallTimer)
      Call.control({
        channelId: this.beCalledInfo.channelId,
        // eslint-disable-next-line
        command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
      })
      Call.callRejectResponse(this.beCalledInfo).then(data => {
        this.beCalledInfo = null
        this.calling = false
        this.beCalling = false
        this.callShow = false
      }).catch(err => {
        console.log(err)
        // 自己断网
        this.hangup()
      })
    },
    // 挂断音视频通话
    hangup () {
      Call.hangup()
      this.calling = false
      this.beCalling = false
      this.isWebRTCConnect = false
      this.videoCallShow = false
      this.voiceCallShow = false
      this.callShow = false
      this.deviceAudioOutOn = false
      this.deviceAudioInOn = false
      clearTimeout(this.callTimer)
      clearTimeout(this.beCallTimer)
      clearInterval(this.netcallDurationTimer)
    },
    // 我方音频切换为视频
    switchVideo () {
      this.voiceCallShow = false
      this.videoCallShow = true
      this.waitSwitchVideo = true
      this.startCamera().then(() => {
        Call.startLocalStream()
        Call.setVideoViewSize(this.localWidth, this.localHeight)
      }).then(() => {
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO
        })
        // 等待对方开启摄像头，本地UI显示等待状态
        // this.updateVideoShowSize(true)
      })
    },
    // 我方切换到音频通话，直接执行切换到音频，对面收到消息也直接执行切换为音频
    switchVoice () {
      Call.control({
        // eslint-disable-next-line
        command: WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO
      })
      this.toSwitchVoice()
      this.waitCallVideo = false
    },
    // 对方请求切换为视频，我方拒绝
    rejectCallVideo () {
      Call.control({
        // eslint-disable-next-line
        command: WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT
      })
      this.waitCallVideo = false
    },
    // 对方请求切换为视频，我方同意
    acceptCallVideo () {
      this.waitCallVideo = false
      this.voiceCallShow = false
      this.videoCallShow = true
      Call.control({
        // eslint-disable-next-line
        command: WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE
      })
      this.startCamera().then(() => {
        Call.startLocalStream()
        Call.setVideoViewSize(this.localWidth, this.localHeight)
      }).then(() => {
        return Call.switchAudioToVideo()
      }).then(() => {
        Call.startRemoteStream(Storage.userInfo.account)
        Call.setVideoViewRemoteSize(this.remoteWidth, this.remoteHeight)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 对方请求从视频切换到音频
    toSwitchVoice () {
      this.videoCallShow = false
      this.voiceCallShow = true
      this.stopCamera().then(() => {
        Call.switchVideoToAudio()
      }).then(() => {
        Call.stopLocalStream()
        Call.stopRemoteStream(Storage.userInfo.account)
      })
    },
    // 我方请求音频切换到视频通话，对方同意时
    doSwitchToVideo () {
      this.startCamera().then(() => {
        Call.startLocalStream()
        Call.setVideoViewSize(this.localWidth, this.localHeight)
      }).then(() => {
        return Call.switchAudioToVideo()
      }).then(() => {
        Call.startRemoteStream(Storage.userInfo.account)
        Call.setVideoViewRemoteSize(this.remoteWidth, this.remoteHeight)
      }).catch((err) => {
        console.log(err)
      })
      // this.checkDeviceStateUI()
    },
    // 通话显示时长
    startDurationTimer () {
      this.netcallDurationTimer = 0
      let netcallDuration = 0
      clearInterval(this.netcallDurationTimer)
      let netcallStartTime = (new Date()).getTime()
      this.netcallDurationTimer = setInterval(() => {
        let now = (new Date()).getTime()
        netcallDuration = now - netcallStartTime
        this.netcallDurationText = this.getDurationText(netcallDuration)
      }, 1000)
    },
    getDurationText (ms) {
      let allSeconds = parseInt(ms / 1000)
      let result = ''
      let hours, minutes, seconds
      if (allSeconds >= 3600) {
        hours = parseInt(allSeconds / 3600)
        result += ('00' + hours).slice(-2) + ' : '
      }
      if (allSeconds >= 60) {
        minutes = parseInt(allSeconds % 3600 / 60)
        result += ('00' + minutes).slice(-2) + ' : '
      } else {
        result += '00 : '
      }
      seconds = parseInt(allSeconds % 3600 % 60)
      result += ('00' + seconds).slice(-2)
      return result
    },
    // 开启摄像头
    startCamera () {
      return Call.startDeviceVideo().then(() => {
        // 通知对方自己开启摄像头
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON
        })
      }).catch(() => {
        Error.show('摄像头开启失败')
        // 通知对方，我方摄像头不可用
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID
        })
      })
    },
    // 关闭摄像头
    stopCamera () {
      return Call.stopDeviceVideo().then(() => {
        Error.show('关掉摄像头')
        // 通知对方自己关闭了摄像头
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF
        })
      }).catch(() => {
        Error.show('关闭摄像头失败')
      })
    },
    // 开启麦克风
    startAudio () {
      this.deviceAudioInOn = true
      return Call.startMicrophone().then(date => {
        Error.show('开启麦克风')
        // 通知对方自己开启了麦克风
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
        })
      }).catch(() => {
        Error.show('开启麦克风失败')
        // 通知对方，我方麦克风不可用
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_SELF_AUDIO_INVALID
        })
      })
    },
    // 开启对方声音
    startOtherVoice () {
      this.deviceAudioOutOn = true
      return Call.startDeviceAudioOutChat().then(() => {
        Error.show('开启扬声器成功')
      }).catch(() => {
        Error.show('开启扬声器失败')
      })
    },
    // 对方接收或者拒绝发送本地消息通知自己
    sendLocalMessage (callType) {
      let messagText = ''
      // if (callType === 1 || callType === WebRTC.NETCALL_TYPE_AUDIO) {
      //   messagText = '未接听'
      // }
      this.messages.push({
        type: 'notification',
        isMine: true,
        content: messagText,
        portrait: Account.portrait
      })
    }
  },
  watch: {
    'videoCallShow' (videoShow) {
      this.$nextTick(() => {
        this.getVoideSize()
      })
    },
    // 监听是否发起音视频通话
    '$store.state.callType' (type) {
      this.callShow = true
      if (type === 'voiceCall') this.voiceCall()
      if (type === 'videoCall') this.videoCall()
      Storage.callType = null
    },
    // 监听收到呼叫的通知
    '$store.state.beCalling' (beCalling) {
      if (beCalling.channelId === this.channelId) return
      console.log(beCalling)
      if (this.beCalling || this.calling) {
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY,
          channelId: beCalling.channelId
        })
        return
      }
      // eslint-disable-next-line
      if (beCalling.type === 1 || beCalling.type === WebRTC.NETCALL_TYPE_AUDIO) {
        this.isCallType = true
      } else {
        this.isCallType = false
      }
      this.channelId = beCalling.channelId
      this.beCalledInfo = beCalling
      this.beCalling = true
      this.callShow = true
      /**
       * 考虑被呼叫时，呼叫方断网，被呼叫方不能收到hangup消息，因此设置一个超时时间
       * 在通话连接建立后，停掉这个计时器
       */
      this.beCallTimer = setTimeout(() => {
        if (!this.beCallTimer) return
        console.log('呼叫方可能已经掉线，挂断通话')
        this.beCallTimer = null
        // 拒绝音视频通话
        // reject()
      }, 62 * 1000)
    },
    // 监听被拒绝
    '$store.state.callRejected' (callRejected) {
      Error.show('对方拒绝通话')
      this.hangup()
      // 发送本地消息
      // sendText()
    },
    // 监听对方接受通话
    '$store.state.callAccepted' (callAccepted) {
      clearTimeout(this.callTimer)
      Call.startRtc().then((data) => {
        Error.show('音视频通话开始')
        this.acceptAndWait = false
        this.callType = callAccepted.type
        clearInterval(this.callTimer)
        return this.startAudio()
      }).then(() => {
        // eslint-disable-next-line
        if (callAccepted.type === WebRTC.NETCALL_TYPE_VIDEO || callAccepted.type === 2) {
          this.startCamera().then(() => {
            Call.startLocalStream()
            Call.setVideoViewSize(this.localWidth, this.localHeight)
            Call.setCaptureVolume(255)
            Call.setPlayVolume(callAccepted.account, 255)
          })
        } else {
          this.stopCamera().then(() => {
            Call.setCaptureVolume(255)
            Call.setPlayVolume(callAccepted.account, 255)
          })
        }
      }).catch((e) => {
        console.error(e)
        console.log('连接出错')
      })
      this.isWebRTCConnect = true
      // 通话时长显示
      this.startDurationTimer()
      // 关闭被呼叫倒计时
      this.beCallTimer = null
    },
    // 监听对方接入webrtc
    '$store.state.remoteTrack' (remoteTrack) {
      console.log(remoteTrack)
      if (remoteTrack.track.kind === 'video') {
        Call.startRemoteStream(remoteTrack.account)
        Call.setVideoViewRemoteSize(this.remoteWidth, this.remoteHeight)
      }
      this.startOtherVoice()
    },
    // 监听挂断通话
    '$store.state.hangup' (hangup) {
      this.hangup()
    },
    // 同步命令
    '$store.state.callerAckSync' (callerAckSync) {
      if (this.beCalledInfo && callerAckSync.channelId === this.beCalledInfo.channelId) {
        Error.show('其它端已处理')
        this.beCalledInfo = null
        this.beCalling = false
        this.callShow = false
      }
    },
    // 监听control指令
    '$store.state.control' (control) {
      // 如果不是当前通话的指令, 直接丢掉
      if (Call.notCurrentChannelId(control)) return
      switch (control.type) {
        // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON:
          Error.show('对方打开了音频')
          break
        // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF:
          Error.show('对方关闭了音频')
          break
        // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON:
          Error.show('对方打开了视频')
          break
        // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF:
          Error.show('对方关闭了视频')
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 对方从视频切换到音频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
        // 直接关闭视频打开音频
          this.toSwitchVoice()
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
          this.waitCallVideo = true
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
          Error.show('对方拒绝了视频通话')
          this.videoCallShow = false
          this.voiceCallShow = true
          this.stopCamera()
          Call.stopLocalStream()
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
          Error.show('对方同意视频通话')
          this.voiceCallShow = false
          this.videoCallShow = true
          this.waitSwitchVideo = false
          this.doSwitchToVideo()
          break
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED:
          Error.show('对方收到通知')
          break
        // NETCALL_CONTROL_COMMAND_BUSY 占线
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_BUSY:
          Error.show('对方忙')
          break
        // 自己的摄像头不可用
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID:
          Error.show('自己摄像头不可用')
          break
        // NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
        // NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
        // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START 通知对方自己开始录制视频了
        // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP 通知对方自己结束录制视频了
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./Call.scss";
</style>
