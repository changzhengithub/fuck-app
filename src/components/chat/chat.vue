<template>
  <!-- s 好友聊天 -->
  <section class="chat" :class="{switchMore: switchMoreShow || switchEmojiShow}">
    <TitleComponent :title="title" @OTHER_EVENT="gotoPage('personal-info')"></TitleComponent>
    <ul class="chat-list" id="chat-list">
      <li class="list-item" v-for="(item, index) in messages" :key="index">
        <div class="item-time" v-if="item.timeShow">
          <div class="time font-24 color-white">{{item.timeShow}}</div>
        </div>
        <div class="item-tip" v-if="item.type == 'tip'">
          <div class="tip-msg font-18 color-white">{{item.content}}</div>
        </div>
        <div class="item-message padding-horizontal-30 clear" v-if="item.type !== 'tip'">
          <div class="message-portrait" :class="item.isMine ? 'fr' : 'fl'">
            <img :src="item.portrait">
          </div>
          <div class="message-content" :class="item.isMine ? 'fr' : 'fl'">
            <div class="content-text" :class="item.isMine ? 'arrow-blue-right' : 'arrow-white-left'"  v-if="item.type == 'text'">
              <TextMessage :content="item"></TextMessage>
            </div>
            <div class="content-voice" :class="[item.isMine ? 'arrow-blue-right' : 'arrow-white-left', item.isMine ? 'content-voice-right' : 'content-voice-left']" v-else-if="item.type == 'voice'">
              <i class="iconfont font-33" :class="item.isMine ? 'icon-audio-right' : 'icon-yuyin'"></i>
              <div class="voice-seconds voice-seconds-right font-30 color-light-grey">15"</div>
            </div>
            <div class="content-img" :class="item.isMine ? 'arrow-white-right' : 'arrow-white-left'" v-else-if="item.type == 'image'">
              <img :src="item.content.url">
            </div>
            <div class="content-chartlet" :class="item.isMine ? 'arrow-white-right' : 'arrow-white-left'" v-else-if="item.type == 'tt'">
              <img :src="item.content.url">
            </div>
            <div class="content-transfer" :class="item.isMine ? 'arrow-red-right' : 'arrow-red-left'" v-else-if="item.type == 'zz'">
              <div class="transfer-detail">
                <i class="iconfont icon-transfer"></i>
                <div class="detail-text">
                  <p class="text-price">{{item.content.money}}元</p>
                  <p class="text-title">转账</p>
                </div>
              </div>
              <div class="transfer-title">借条大师-转账</div>
            </div>
            <div class="content-iou" :class="item.isMine ? 'arrow-orange-right' : 'arrow-orange-left'" v-else-if="item.type == 'qt'">
              <div class="iou-detail">
                <i class="iconfont icon-qian"></i>
                <div class="detail-text">
                  <p class="text-price">{{item.content.money}}元</p>
                  <p class="text-title">像你打了个欠条</p>
                </div>
              </div>
              <div class="iou-title">借条大师-欠条</div>
            </div>
            <div class="content-receipt" :class="item.isMine ? 'arrow-blue-right' : 'arrow-blue-left'" v-else-if="item.type == 'jt'">
              <div class="receipt-detail">
                <i class="iconfont icon-jie"></i>
                <div class="detail-text">
                  <p class="text-price">{{item.content.money}}元</p>
                  <p class="text-title">像你打了个借条</p>
                </div>
              </div>
              <div class="receipt-title">借条大师-转账</div>
            </div>
            <div class="content-credit" :class="item.isMine ? 'arrow-white-right' : 'arrow-white-left'" v-else-if="item.type == 'xybg'">
              <div class="credit-detail">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xinyongbaogaofasongtubiao"></use>
                </svg>
                <p class="detail-title">{{item.content.title}}</p>
              </div>
              <div class="credit-title">信用报告</div>
            </div>
            <div class="content-card" :class="item.isMine ? 'arrow-white-right' : 'arrow-white-left'" v-else-if="item.type == 'mp'" @click="gotoPage('personal-info')">
              <div class="card-detail">
                <div class="detail-img">
                  <img :src="item.content.money">
                </div>
                <div class="detail-text">
                  <p class="text-name">{{item.content.title}}</p>
                  <p class="text-id">借条ID: {{item.content.id}}</p>
                </div>
              </div>
              <div class="card-title">个人名片</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="chat-input">
      <div class="input-eara">
        <i class="iconfont" :class="inputType ? 'icon-jianpan' : 'icon-yuyin1'" @click="toggleInputType"></i>
        <div class="eara-content bg-white">
          <div class="content-edit" v-if="!inputType">
            <div class="edit-container">
              <!-- <p class="container-text" ref="edit" :contenteditable="true" v-html="inputText"></p> -->
              <vmodel ref="edit" :onFocus="onFocus" @INPUT_EVENT="getInputValue"></vmodel>
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
        <div class="facebread-content">
          <div class="content-item" v-if="facebread == 'small'">
            <ul class="small-list">
              <li class="list-item" v-for="(item, index) in emojiArr" :key="index">
                <img :src="item.file" @click="selectSmall(item)">
              </li>
            </ul>
          </div>
          <div class="content-item" v-if="facebread == 'rooster'">
            <ul class="rooster-list">
              <li class="list-item" v-for="(item, index) in ajmdArr" :key="index"  @click="selectEmoji(item, index)">
                <img :src="item.file">
              </li>
            </ul>
          </div>
          <div class="content-item" v-if="facebread == 'dog'">
            <ul class="dog-list">
              <li class="list-item" v-for="(item, index) in xxyArr" :key="index" @click="selectEmoji(item, index)">
                <img :src="item.file">
              </li>
            </ul>
          </div>
          <div class="content-item" v-if="facebread == 'rabbit'">
            <ul class="rabbit-list">
              <li class="list-item" v-for="(item, index) in ltArr" :key="index" @click="selectEmoji(item, index)">
                <img :src="item.file">
              </li>
            </ul>
          </div>
        </div>
        <nav class="facebread-nav">
          <div class="nav-item" :class="{'nav-active':facebread == 'small'}" @click="selectFacebread('small')">
            <img src="../../assets/images/emoji_0.png">
          </div>
          <div class="nav-item" :class="{'nav-active':facebread == 'rooster'}" @click="selectFacebread('rooster')">
            <img src="../../assets/images/ajmd001.png">
          </div>
          <div class="nav-item" :class="{'nav-active':facebread == 'dog'}" @click="selectFacebread('dog')">
            <img src="../../assets/images/xxy001.png">
          </div>
          <div class="nav-item" :class="{'nav-active':facebread == 'rabbit'}" @click="selectFacebread('rabbit')">
            <img src="../../assets/images/lt001.png">
          </div>
        </nav>
      </div>
      <div class="input-more" v-if="switchMoreShow">
        <div class="more-item" @click="openPictureModal">
          <div class="item-icon bg-white">
            <i class="iconfont icon-img font-51"></i>
          </div>
          <p class="font-24">图片</p>
        </div>
        <div class="more-item" @click="callModal">
          <div class="item-icon bg-white">
            <i class="iconfont icon-video font-51"></i>
          </div>
          <p class="font-24">视频通话</p>
        </div>
        <div class="more-item" @click="voiceCall">
          <div class="item-icon bg-white">
            <i class="iconfont icon-phone1 font-51"></i>
          </div>
          <p class="font-24">语音通话</p>
        </div>
        <div class="more-item" @click="gotoBorrow(1)">
          <div class="item-icon bg-white">
            <i class="iconfont icon-jie font-51"></i>
          </div>
          <p class="font-24">我要借</p>
        </div>
        <div class="more-item" @click="gotoBorrow(2)">
          <div class="item-icon bg-white">
            <i class="iconfont icon-qian font-51"></i>
          </div>
          <p class="font-24">打欠条</p>
        </div>
        <div class="more-item" @click="gotoTransfer('friend-transfer')">
          <div class="item-icon bg-white">
            <i class="iconfont icon-transfer font-51"></i>
          </div>
          <p class="font-24">转账</p>
        </div>
        <div class="more-item" @click="gotoPage('credit-report')">
          <div class="item-icon bg-white">
            <i class="iconfont icon-credit font-51"></i>
          </div>
          <p class="font-24">信用报告</p>
        </div>
        <div class="more-item" @click="gotoPage('select-friend')">
          <div class="item-icon bg-white">
            <i class="iconfont icon-Id font-51"></i>
          </div>
          <p class="font-24">个人名片</p>
        </div>
      </div>
    </div>
    <CallVideoComponent></CallVideoComponent>
    <ModalComponent v-show="modalShow" @CLOSE_EVENT="closeModal">
      <OpenPictureComponent v-if="openPictureShow" @SELECT_PICTURE_EVENT="selectPicture"></OpenPictureComponent>
      <!-- <CallComponent v-if="callShow" @VIDEO_CALL_EVENT="videoCall" @VOICE_CALL_EVENT="voiceCall" @CANCEL_EVENT="closeModal"></CallComponent> -->
    </ModalComponent>
  </section>
  <!-- e 好友聊天 -->
</template>

<script>
import TextMessage from './message/message.vue'
import OpenPictureComponent from './open-picture/open-picture.vue'
import CallVideoComponent from './call-video/call-video.vue'
import Vmodel from './v-model/v-model.vue'
// include dependence
import Account from '../../class/Account.class.js'
import Call from '../../class/Call.class.js'
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
      messages: [],
      content: '',
      facebread: 'small',
      onFocus: false,
      inputText: '',
      enCodeInput: '',
      personalInfo: null,
      inputType: false,
      switchEmojiShow: false,
      switchMoreShow: false,
      modalShow: false,
      openPictureShow: false,
      // emoji
      emojiArr: [{name: '[大笑]', file: require('../../assets/images/emoji/emoji_0.png')}, {name: '[可爱]', file: require('../../assets/images/emoji/emoji_01.png')}, {name: '[色]', file: require('../../assets/images/emoji/emoji_02.png')}, {name: '[嘘]', file: require('../../assets/images/emoji/emoji_03.png')}, {name: '[亲]', file: require('../../assets/images/emoji/emoji_04.png')}, {name: '[呆]', file: require('../../assets/images/emoji/emoji_05.png')}, {name: '[口水]', file: require('../../assets/images/emoji/emoji_06.png')}, {name: '[汗]', file: require('../../assets/images/emoji/emoji_145.png')}, {name: '[呲牙]', file: require('../../assets/images/emoji/emoji_07.png')}, {name: '[鬼脸]', file: require('../../assets/images/emoji/emoji_08.png')}, {name: '[害羞]', file: require('../../assets/images/emoji/emoji_09.png')}, {name: '[偷笑]', file: require('../../assets/images/emoji/emoji_10.png')}, {name: '[调皮]', file: require('../../assets/images/emoji/emoji_11.png')}, {name: '[可怜]', file: require('../../assets/images/emoji/emoji_12.png')}, {name: '[敲]', file: require('../../assets/images/emoji/emoji_13.png')}, {name: '[惊讶]', file: require('../../assets/images/emoji/emoji_14.png')}, {name: '[流感]', file: require('../../assets/images/emoji/emoji_15.png')}, {name: '[委屈]', file: require('../../assets/images/emoji/emoji_16.png')}, {name: '[流泪]', file: require('../../assets/images/emoji/emoji_17.png')}, {name: '[嚎哭]', file: require('../../assets/images/emoji/emoji_18.png')}, {name: '[惊恐]', file: require('../../assets/images/emoji/emoji_19.png')}, {name: '[怒]', file: require('../../assets/images/emoji/emoji_20.png')}, {name: '[酷]', file: require('../../assets/images/emoji/emoji_21.png')}, {name: '[不说]', file: require('../../assets/images/emoji/emoji_22.png')}, {name: '[鄙视]', file: require('../../assets/images/emoji/emoji_23.png')}, {name: '[阿弥陀佛]', file: require('../../assets/images/emoji/emoji_24.png')}, {name: '[奸笑]', file: require('../../assets/images/emoji/emoji_25.png')}, {name: '[睡着]', file: require('../../assets/images/emoji/emoji_26.png')}, {name: '[口罩]', file: require('../../assets/images/emoji/emoji_27.png')}, {name: '[努力]', file: require('../../assets/images/emoji/emoji_28.png')}, {name: '[抠鼻孔]', file: require('../../assets/images/emoji/emoji_29.png')}, {name: '[疑问]', file: require('../../assets/images/emoji/emoji_30.png')}, {name: '[怒骂]', file: require('../../assets/images/emoji/emoji_31.png')}, {name: '[晕]', file: require('../../assets/images/emoji/emoji_32.png')}, {name: '[呕吐]', file: require('../../assets/images/emoji/emoji_33.png')}, {name: '[拜一拜]', file: require('../../assets/images/emoji/emoji_160.png')}, {name: '[惊喜]', file: require('../../assets/images/emoji/emoji_161.png')}, {name: '[流汗]', file: require('../../assets/images/emoji/emoji_162.png')}, {name: '[卖萌]', file: require('../../assets/images/emoji/emoji_163.png')}, {name: '[默契眨眼]', file: require('../../assets/images/emoji/emoji_164.png')}, {name: '[烧香拜佛]', file: require('../../assets/images/emoji/emoji_165.png')}, {name: '[晚安]', file: require('../../assets/images/emoji/emoji_166.png')}, {name: '[强]', file: require('../../assets/images/emoji/emoji_34.png')}, {name: '[弱]', file: require('../../assets/images/emoji/emoji_35.png')}, {name: '[OK]', file: require('../../assets/images/emoji/emoji_36.png')}, {name: '[拳头]', file: require('../../assets/images/emoji/emoji_37.png')}, {name: '[胜利]', file: require('../../assets/images/emoji/emoji_38.png')}, {name: '[鼓掌]', file: require('../../assets/images/emoji/emoji_39.png')}, {name: '[握手]', file: require('../../assets/images/emoji/emoji_200.png')}, {name: '[发怒]', file: require('../../assets/images/emoji/emoji_40.png')}, {name: '[骷髅]', file: require('../../assets/images/emoji/emoji_41.png')}, {name: '[便便]', file: require('../../assets/images/emoji/emoji_42.png')}, {name: '[火]', file: require('../../assets/images/emoji/emoji_43.png')}, {name: '[溜]', file: require('../../assets/images/emoji/emoji_44.png')}, {name: '[爱心]', file: require('../../assets/images/emoji/emoji_45.png')}, {name: '[心碎]', file: require('../../assets/images/emoji/emoji_46.png')}, {name: '[钟情]', file: require('../../assets/images/emoji/emoji_47.png')}, {name: '[唇]', file: require('../../assets/images/emoji/emoji_48.png')}, {name: '[戒指]', file: require('../../assets/images/emoji/emoji_49.png')}, {name: '[钻石]', file: require('../../assets/images/emoji/emoji_50.png')}, {name: '[太阳]', file: require('../../assets/images/emoji/emoji_51.png')}, {name: '[有时晴]', file: require('../../assets/images/emoji/emoji_52.png')}, {name: '[多云]', file: require('../../assets/images/emoji/emoji_53.png')}, {name: '[雷]', file: require('../../assets/images/emoji/emoji_54.png')}, {name: '[雨]', file: require('../../assets/images/emoji/emoji_55.png')}, {name: '[雪花]', file: require('../../assets/images/emoji/emoji_56.png')}, {name: '[爱人]', file: require('../../assets/images/emoji/emoji_57.png')}, {name: '[帽子]', file: require('../../assets/images/emoji/emoji_58.png')}, {name: '[皇冠]', file: require('../../assets/images/emoji/emoji_59.png')}, {name: '[篮球]', file: require('../../assets/images/emoji/emoji_60.png')}, {name: '[足球]', file: require('../../assets/images/emoji/emoji_61.png')}, {name: '[垒球]', file: require('../../assets/images/emoji/emoji_62.png')}, {name: '[网球]', file: require('../../assets/images/emoji/emoji_63.png')}, {name: '[台球]', file: require('../../assets/images/emoji/emoji_64.png')}, {name: '[咖啡]', file: require('../../assets/images/emoji/emoji_65.png')}, {name: '[啤酒]', file: require('../../assets/images/emoji/emoji_66.png')}, {name: '[干杯]', file: require('../../assets/images/emoji/emoji_67.png')}, {name: '[柠檬汁]', file: require('../../assets/images/emoji/emoji_68.png')}, {name: '[餐具]', file: require('../../assets/images/emoji/emoji_69.png')}, {name: '[汉堡]', file: require('../../assets/images/emoji/emoji_70.png')}, {name: '[鸡腿]', file: require('../../assets/images/emoji/emoji_71.png')}, {name: '[面条]', file: require('../../assets/images/emoji/emoji_72.png')}, {name: '[冰淇淋]', file: require('../../assets/images/emoji/emoji_73.png')}, {name: '[沙冰]', file: require('../../assets/images/emoji/emoji_74.png')}, {name: '[生日蛋糕]', file: require('../../assets/images/emoji/emoji_75.png')}, {name: '[蛋糕]', file: require('../../assets/images/emoji/emoji_76.png')}, {name: '[糖果]', file: require('../../assets/images/emoji/emoji_77.png')}, {name: '[葡萄]', file: require('../../assets/images/emoji/emoji_78.png')}, {name: '[西瓜]', file: require('../../assets/images/emoji/emoji_79.png')}, {name: '[光碟]', file: require('../../assets/images/emoji/emoji_80.png')}, {name: '[手机]', file: require('../../assets/images/emoji/emoji_81.png')}, {name: '[电话]', file: require('../../assets/images/emoji/emoji_82.png')}, {name: '[电视]', file: require('../../assets/images/emoji/emoji_83.png')}, {name: '[声音开启]', file: require('../../assets/images/emoji/emoji_84.png')}, {name: '[声音关闭]', file: require('../../assets/images/emoji/emoji_85.png')}, {name: '[铃铛]', file: require('../../assets/images/emoji/emoji_86.png')}, {name: '[锁头]', file: require('../../assets/images/emoji/emoji_87.png')}, {name: '[放大镜]', file: require('../../assets/images/emoji/emoji_88.png')}, {name: '[灯泡]', file: require('../../assets/images/emoji/emoji_89.png')}, {name: '[锤头]', file: require('../../assets/images/emoji/emoji_90.png')}, {name: '[烟]', file: require('../../assets/images/emoji/emoji_91.png')}, {name: '[炸弹]', file: require('../../assets/images/emoji/emoji_92.png')}, {name: '[枪]', file: require('../../assets/images/emoji/emoji_93.png')}, {name: '[刀]', file: require('../../assets/images/emoji/emoji_94.png')}, {name: '[药]', file: require('../../assets/images/emoji/emoji_95.png')}, {name: '[打针]', file: require('../../assets/images/emoji/emoji_96.png')}, {name: '[钱袋]', file: require('../../assets/images/emoji/emoji_97.png')}, {name: '[钞票]', file: require('../../assets/images/emoji/emoji_98.png')}, {name: '[银行卡]', file: require('../../assets/images/emoji/emoji_99.png')}, {name: '[手柄]', file: require('../../assets/images/emoji/emoji_100.png')}, {name: '[麻将]', file: require('../../assets/images/emoji/emoji_101.png')}, {name: '[调色板]', file: require('../../assets/images/emoji/emoji_102.png')}, {name: '[电影]', file: require('../../assets/images/emoji/emoji_103.png')}, {name: '[麦克风]', file: require('../../assets/images/emoji/emoji_104.png')}, {name: '[耳机]', file: require('../../assets/images/emoji/emoji_105.png')}, {name: '[音乐]', file: require('../../assets/images/emoji/emoji_106.png')}, {name: '[吉他]', file: require('../../assets/images/emoji/emoji_107.png')}, {name: '[火箭]', file: require('../../assets/images/emoji/emoji_108.png')}, {name: '[飞机]', file: require('../../assets/images/emoji/emoji_109.png')}, {name: '[火车]', file: require('../../assets/images/emoji/emoji_110.png')}, {name: '[公交]', file: require('../../assets/images/emoji/emoji_111.png')}, {name: '[轿车]', file: require('../../assets/images/emoji/emoji_112.png')}, {name: '[出租车]', file: require('../../assets/images/emoji/emoji_113.png')}, {name: '[警车]', file: require('../../assets/images/emoji/emoji_114.png')}, {name: '[自行车]', file: require('../../assets/images/emoji/emoji_115.png')}],
      ltArr: [],
      xxyArr: [],
      ajmdArr: []
      // start params
      // end params
    }
  },
  components: {
    TitleComponent,
    OpenPictureComponent,
    ModalComponent,
    TextMessage,
    CallVideoComponent,
    Vmodel
    // include components
  },
  created () {
    if (Storage.userInfo) {
      this.title.contentText = Storage.userInfo.nick
    }
    this.init()
    this.getEmojiArr()
  },
  mounted () {
    this.scrollToBottom()
  },
  updated () {
    this.scrollToBottom()
  },
  methods: {
    // 初始化
    init () {
      Chat.historyMsgs(Chat.target.id).success(data => {
        this.messages = []
        data.msgs = data.msgs.reverse()
        if (Storage.customMsg) {
          data.msgs.push(Storage.customMsg)
        }
        // this.getSendMsgsTime(data.msgs)
        data.msgs.forEach((message, index) => {
          if (index === 0) {
            data.msgs[0].timeShow = this.dealTime(message.time)
          } else {
            if (message.time - data.msgs[index - 1].time > 5 * 60 * 1000) {
              message.timeShow = this.dealTime(message.time)
            } else {
              message.timeShow = ''
            }
          }
          console.log(message)
          let custom = {}
          let isMine = true
          let avator = Account.portrait
          let content = null
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
              content = message.tip
              break
            case 'image':
              content = message.file
              break
            case 'audio':
              content = message.file
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
            timeShow: message.timeShow,
            mark: false
          })
        })
        Storage.customMsg = null
      })
    },
    // 表情
    selectSmall (item) {
      this.$refs.edit.selectImg(item)
    },
    // 发送文本消息
    sendText () {
      if (!this.inputText) return
      Chat.sendText(Chat.target.id, this.inputText)
        .success(text => {
          this.messages.push({
            type: 'text',
            isMine: true,
            content: this.inputText,
            portrait: Account.portrait,
            mark: true
          })
          this.inputText = ''
          this.enCodeInput = ''
          this.$refs.edit.handleInput(this.enCodeInput)
        })
    },
    // 表情包发送
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
          mark: true
        })
      })
    },
    // 处理input输入数据
    getInputValue (value) {
      this.enCodeInput = value
      this.inputText = this.emojiEncode(value)
    },
    // 获取表情src
    getEmojiArr () {
      for (let i = 1; i < 20; i++) {
        let ltJson = {}
        ltJson.file = require('../../assets/images/lt/lt0' + (i >= 10 ? i : '0' + i) + '.png')
        ltJson.catalog = 'lt'
        ltJson.chartlet = 'lt0' + (i >= 10 ? i : '0' + i)
        this.ltArr.push(ltJson)
      }
      for (let i = 1; i < 48; i++) {
        let ltJson = {}
        ltJson.file = require('../../assets/images/ajmd/ajmd0' + (i >= 10 ? i : '0' + i) + '.png')
        ltJson.catalog = 'ajmd'
        ltJson.chartlet = 'ajmd0' + (i >= 10 ? i : '0' + i)
        this.ajmdArr.push(ltJson)
      }
      for (let i = 1; i < 40; i++) {
        let ltJson = {}
        ltJson.file = require('../../assets/images/xxy/xxy0' + (i >= 10 ? i : '0' + i) + '.png')
        ltJson.catalog = 'xxy'
        ltJson.chartlet = 'xxy0' + (i >= 10 ? i : '0' + i)
        this.xxyArr.push(ltJson)
      }
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
    // 时间间隔处理
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
    // 聊天记录滚动底部
    scrollToBottom () {
      this.$nextTick(() => {
        let container = document.getElementById('chat-list')
        container.scrollTop = container.scrollHeight
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
    gotoPage (page) {
      Router.push(page)
    },
    videoCall () {},
    voiceCall () {
      Call.call(Storage.userInfo.account)
    },
    takePicture () {},
    selectPicture (data) {
      this.modalShow = false
      this.openPictureShow = false
      this.messages.push({
        type: data.type,
        isMine: true,
        content: data.file,
        portrait: Account.portrait,
        mark: true
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
    selectFacebread (facebread) {
      this.facebread = facebread
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
    '$store.state.message': function (message) {
      let custom = {}
      let content = null
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
          content = message.file
          break
      }
      this.messages.push({
        type: message.type,
        content: content,
        isMine: false,
        portrait: Chat.target.portrait,
        mark: false
      })
      Chat.sessionUnread(message.sessionId)
    }
  }
}
</script>

<style lang="sass">
@import "./chat.scss";
</style>
