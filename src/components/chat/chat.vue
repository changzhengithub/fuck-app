<template>
  <!-- s 好友聊天 -->
  <section class="chat" :class="{switchMore: switchMoreShow || switchEmojiShow}">
    <TitleComponent :title="title" @OTHER_EVENT="gotoPage('personal-info')"></TitleComponent>
    <ChatSessionComponent :messages="messages"></ChatSessionComponent>
    <div class="chat-input" ref="input">
      <div class="input-eara">
        <i class="iconfont" :class="inputType ? 'icon-jianpan' : 'icon-yuyin1'" @click="toggleInputType"></i>
        <div class="eara-content bg-white">
          <div class="content-edit" v-if="!inputType">
            <div class="edit-container">
              <vmodel ref="edit" :onFocus="onFocus" @INPUT_EVENT="getInputValue" @INTO_VIEW_EVENT="scrollInfoView"></vmodel>
            </div>
          </div>
          <div class="content-voice" v-if="inputType">
            <span>按住说话</span>
          </div>
        </div>
        <i class="iconfont icon-xiaolian" @click="switchEmoji"></i>
        <div class="eara-add">
          <i class="iconfont icon-jiahao" v-if="!inputText" @click="switchMore"></i>
          <button class="add-send bg-blue" v-else-if="inputText && !inputType"><div class="color-white font-27" @click="sendText">发送</div></button>
        </div>
      </div>
      <div class="input-facebread bg-white" v-if="switchEmojiShow">
        <FaceBreadComponent @SELECT_SMALL_EVENT="selectSmall" @SELECT_EMOJI_EVENT="selectEmoji"></FaceBreadComponent>
      </div>
      <ChatMoreComponent v-if="switchMoreShow" @OPEN_PICTRUE_MODAL_EVENT="openPictureModal" @GOTO_CALL_EVENT="gotoCall" @GOTO_BORROW_EVENT="gotoBorrow" @GOTO_TRANSFER_EVENT="gotoTransfer" @GOTO_PAGE_EVENT="gotoPage"></ChatMoreComponent>
    </div>
    <ModalComponent v-show="modalShow" @CLOSE_EVENT="closeModal">
      <OpenPictureComponent v-if="openPictureShow" @SELECT_PICTURE_EVENT="selectPicture"></OpenPictureComponent>
    </ModalComponent>
  </section>
  <!-- e 好友聊天 -->
</template>

<script>
import ChatMoreComponent from './chat-more/chat-more.vue'
import ChatSessionComponent from '../chat-session/chat-session.vue'
import FaceBreadComponent from './facebread/facebread.vue'
import TextMessage from './message/message.vue'
import OpenPictureComponent from './open-picture/open-picture.vue'
import Vmodel from './v-model/v-model.vue'
// include dependence
import Account from '../../class/Account.class.js'
import Chat from '../../class/Chat.class.js'
import Error from '../../class/Error.class.js'
import Http from '../../class/Http.class.js'
import Replace from '../../class/Replace.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
import Time from '../../class/Time.class.js'
import ModalComponent from '../../module/modal/modal.vue'
import TitleComponent from '../../module/title/title.vue'
export default {
  name: 'ChatComponent',
  data () {
    return {
      title: {
        contentText: 'Name',
        leftText: '好友',
        icon: 'wode'
      },
      audio: null,
      audioTimer: null,
      isAudioPaly: false,
      messages: [],
      content: '',
      onFocus: false,
      inputText: '',
      enCodeInput: '',
      personalInfo: null,
      inputType: false,
      switchEmojiShow: false,
      switchMoreShow: false,
      modalShow: false,
      openPictureShow: false
      // start params
      // end params
    }
  },
  components: {
    TitleComponent,
    OpenPictureComponent,
    ModalComponent,
    TextMessage,
    Vmodel,
    FaceBreadComponent,
    ChatSessionComponent,
    ChatMoreComponent
    // include components
  },
  created () {
    if (Storage.userInfo) {
      this.title.contentText = Storage.userInfo.nick
    }
    this.init()
  },
  mounted () {
    this.scrollToBottom()
  },
  updated () {
    this.scrollToBottom()
  },
  methods: {
    // 音视频通话
    gotoCall (type) {
      Storage.callType = type
    },
    // 初始化
    init () {
      Chat.historyMsgs(Chat.target.id).success(data => {
        this.messages = []
        data.msgs = data.msgs.reverse()
        if (Storage.customMsg) {
          data.msgs.push(Storage.customMsg)
        }
        data.msgs.forEach((message, index) => {
          let custom = {}
          let isMine = true
          let avator = Account.portrait
          let content = null
          if (Chat.target.id === message.from) {
            isMine = false
            avator = Chat.target.portrait
          }
          switch (message.type) {
            case 'custom':
              custom = JSON.parse(message.content)
              if (custom.type === 3) {
                let file = {}
                message.type = 'tt'
                file.url = require('../../assets/images/' + custom.data.catalog + '/' + custom.data.chartlet + '.png')
                content = file
              }
              if (custom.type === 8 || custom.type === 7) {
                message.type = custom.data.type
                content = custom.data
              }
              // custom.data.id = Replace.mask(custom.data.id, 3, 4, '*')
              break
            case 'text':
              let regexp = /((http|ftp|https|file):[^'"\s]+)/ig // 识别链接
              content = message.text.replace(regexp, "<a class='text-link' href='$1' target='_blank'>$1</a>")
              break
            case 'tip':
              custom = JSON.parse(message.custom)
              content = custom.content
              break
            case 'image':
              content = message.file
              break
            case 'audio':
              message.file.dur = Math.floor(message.file.dur / 1000)
              message.file.audioDuration = message.file.dur
              content = message.file
              break
            case 'notification':
              content = this.disposeCallMsg(message.attach)
              break
          }
          this.messages.push({
            type: message.type,
            content: content,
            isMine: isMine,
            portrait: avator,
            time: message.time,
            mark: false
          })
        })
        console.log(this.messages)
        this.sessionsTime(this.messages)
        Storage.customMsg = null
      })
    },
    // 发送文本消息
    sendText () {
      if (!this.inputText) return
      Chat.sendText(Chat.target.id, this.inputText)
        .success(text => {
          let regexp = /((http|ftp|https|file):[^'"\s]+)/ig // 识别链接
          this.inputText = this.inputText.replace(regexp, "&nbsp;<a class='text-link' href='$1' target='_blank'>$1</a>&nbsp;")
          this.messages.push({
            type: 'text',
            isMine: true,
            content: this.inputText,
            portrait: Account.portrait,
            time: text.time
          })
          this.sessionsTime(this.messages)
          this.inputText = ''
          this.enCodeInput = ''
          this.$refs.edit.handleInput(this.enCodeInput)
        })
    },
    // 贴图发送
    selectEmoji (item, index) {
      let content = {}
      content.target = Chat.target.id
      content.chartlet = item.chartlet
      content.catalog = item.catalog
      Chat.chartletMsg(content).success(data => {
        let file = {}
        file.url = require('../../assets/images/' + content.catalog + '/' + content.chartlet + '.png')
        this.messages.push({
          type: 'tt',
          isMine: true,
          content: file,
          portrait: Account.portrait,
          time: data.time
        })
        this.sessionsTime(this.messages)
      })
    },
    gotoBorrow (type) {
      Http.send({
        url: 'IsLoanToTarget',
        data: {
          token: Storage.token,
          type: type,
          phone: Storage.phone,
          targetPhone: Storage.userInfo.account
        }
      }).success(data => {
        let selectObject = []
        selectObject.push({
          imAccid: '',
          Name: Storage.userInfo.nick,
          Phone: Storage.userInfo.account
        })
        Storage.publishObject = selectObject
        Storage.borrowType = type
        Router.push('iou-template')
      }).fail(data => {
        Error.show(data.message)
      })
    },
    gotoTransfer (page) {
      Http.send({
        url: 'IsTransferAccounts',
        data: {
          token: Storage.token,
          phone: Storage.phone,
          targetPhone: Storage.userInfo.account
        }
      }).success(data => {
        Router.push(page)
      }).fail(data => {
        Error.show(data.message)
      })
    },
    // 表情
    selectSmall (item) {
      this.$refs.edit.selectImg(item)
    },
    // 处理input输入数据
    getInputValue (value) {
      this.enCodeInput = value
      this.inputText = this.emojiEncode(value)
    },
    scrollInfoView () {
      this.$nextTick(() => {
        document.getElementById('chat-list').scrollIntoView()
        this.$refs.input.scrollIntoView()
      })
      // setTimeout(() => {
      //   document.getElementById('chat-list').scrollTop = document.body.scrollHeight + 100
      // }, 300)
    },
    // 表情src反解码
    emojiEncode (inputEmojiText) {
      let reg = /<[^>]+>/g
      let reg1 = /\[([^\][]*)\]/g
      let matches = inputEmojiText.match(reg) || '<>'
      for (let j = 0; j < matches.length; ++j) {
        let emojiMatch = matches[j].match(reg1) || '[]'
        inputEmojiText = inputEmojiText.replace(matches[j], emojiMatch[0])
      }
      return inputEmojiText
    },
    // 所有时间间隔处理
    sessionsTime (sessions) {
      sessions.forEach((message, index) => {
        if (index === 0) {
          sessions[0].timeShow = this.dealTime(message.time)
        } else {
          if (message.time - sessions[index - 1].time > 5 * 60 * 1000) {
            message.timeShow = this.dealTime(message.time)
          } else {
            message.timeShow = ''
          }
        }
      })
    },
    // 时间处理
    dealTime (updateTime) {
      let chatTime = ''
      let weeHour = new Date(new Date().setHours(0, 0, 0, 0))
      let befroeWeehour = new Date(new Date().setHours(0, 0, 0, 0)) - 86400000
      if (updateTime > weeHour) {
        chatTime = '今天   ' + Time.format('HH : mm', updateTime)
        return chatTime
      }
      if (updateTime > befroeWeehour) {
        chatTime = '昨天   ' + Time.format('HH : mm', updateTime)
        return chatTime
      }
      chatTime = Time.format('YYYY-MM-DD', updateTime) + '   ' + Time.format('HH : mm', updateTime)
      return chatTime
    },
    // 音视频消息处理
    disposeCallMsg (msg) {
      if (msg.duration) {
        msg.duration = this.dealCallTime(msg.duration)
      } else {
        msg.duration = '未接听'
      }
      if (msg.netcallType === 1) msg.toggleType = true
      if (msg.netcallType === 2) msg.toggleType = false
      return msg
    },
    dealCallTime (time) {
      let callTime = null
      let callHour = null
      let callMinute = null
      let callSecond = null
      callHour = this.fillZero(parseInt(time / 60 / 60))
      callMinute = this.fillZero(parseInt(time / 60))
      callSecond = this.fillZero(time % 60)
      if (parseInt(time / 60 / 60)) {
        callTime = callHour + ' : ' + callMinute + ' : ' + callSecond
        return callTime
      }
      callTime = callMinute + ' : ' + callSecond
      return callTime
    },
    fillZero (num) {
      num = num < 10 ? '0' + num : num
      return num
    },
    playAudio (item, index) {
      clearInterval(this.audioTimer)
      this.isAudioPaly = !this.isAudioPaly
      if (this.isAudioPaly) {
        item.dur = item.audioDuration
        this.audio = new Audio(item.mp3Url)
        this.audio.play()
        this.messages[index].content.dur = 0
        this.audioTimer = setInterval(() => {
          this.messages[index].content.dur++
          if (this.messages[index].content.dur >= item.audioDuration) this.messages[index].content.dur = item.audioDuration
        }, 1000)
      } else {
        clearInterval(this.audioTimer)
        this.audio.pause()
      }
      this.audio.addEventListener('ended', () => {
        this.isAudioPaly = false
        clearInterval(this.audioTimer)
        console.log('执行结束')
      })
    },
    // 聊天记录滚动底部
    scrollToBottom () {
      this.$nextTick(() => {
        let container = document.getElementById('chat-list')
        container.scrollTop = container.scrollHeight
      })
    },
    gotoPage (page) {
      Router.push(page)
    },
    takePicture () {},
    selectPicture (data) {
      this.modalShow = false
      this.openPictureShow = false
      this.messages.push({
        type: data.type,
        isMine: true,
        content: data.file,
        portrait: Account.portrait
      })
    },
    toggleInputType () {
      this.inputType = !this.inputType
      if (!this.inputType) {
        this.onFocus = true
        this.$nextTick(() => {
          this.$refs.edit.handleInput(this.enCodeInput)
        })
      }
    },
    switchMore () {
      this.switchEmojiShow = false
      this.switchMoreShow = !this.switchMoreShow
    },
    switchEmoji () {
      this.inputType = false
      this.switchMoreShow = false
      this.switchEmojiShow = !this.switchEmojiShow
    },
    openPictureModal () {
      this.modalShow = true
      this.openPictureShow = true
    },
    callModal () {
      this.modalShow = true
    },
    closeModal () {
      this.modalShow = false
      this.openPictureShow = false
    }
  },
  watch: {
    // 监听收到消息
    '$store.state.message' (message) {
      console.log(message)
      let custom = {}
      let content = null
      let isMine = true
      let avator = Account.portrait
      switch (message.type) {
        case 'custom':
          custom = JSON.parse(message.content)
          if (custom.type === 3) {
            let file = {}
            message.type = 'tt'
            file.url = require('../../assets/images/' + custom.data.catalog + '/' + custom.data.chartlet + '.png')
            content = file
          }
          if (custom.type === 8 || custom.type === 7) {
            message.type = custom.data.type
            custom.data.id = Replace.mask(custom.data.id, 3, 4, '*')
            content = custom.data
          }
          break
        case 'text':
          let regexp = /((http|ftp|https|file):[^'"\s]+)/ig // 识别链接
          content = message.text.replace(regexp, "<a class='text-link' href='$1' target='_blank'>$1</a>")
          break
        case 'tip':
          content = message.tip
          break
        case 'image':
          content = message.file
          break
        case 'audio':
          message.file.dur = Math.floor(message.file.dur / 1000)
          message.file.audioDuration = message.file.dur
          content = message.file
          break
          // type:   netcallBill
        case 'notification':
          content = this.disposeCallMsg(message.attach)
          console.log(content)
          break
      }
      if (Chat.target.id === message.from) {
        isMine = false
        avator = Chat.target.portrait
      }
      this.messages.push({
        type: message.type,
        content: content,
        isMine: isMine,
        portrait: avator,
        time: message.time
      })
      this.sessionsTime(this.messages)
      Chat.sessionUnread(message.sessionId)
    }
    // 监听音视频通话消息   打开页面时消息消失，所以把自动模拟两边消息发送情况
    // '$store.state.callMessage' (msg) {
    //   this.messages.push(msg)
    //   this.sessionsTime(this.messages)
    // }
  }
}
</script>

<style lang="sass">
@import "./chat.scss";
</style>
