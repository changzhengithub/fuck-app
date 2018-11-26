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
            <div class="content-notification" :class="item.isMine ? 'arrow-blue-right' : 'arrow-white-left'"  v-if="item.type == 'notification'">
              <p>{{item.content}}</p>
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
    <div class="chat-input" ref="input">
      <div class="input-eara">
        <i class="iconfont" :class="inputType ? 'icon-jianpan' : 'icon-yuyin1'" @click="toggleInputType"></i>
        <div class="eara-content bg-white">
          <div class="content-edit" v-if="!inputType">
            <div class="edit-container">
              <!-- <p class="container-text" ref="edit" :contenteditable="true" v-html="inputText"></p> -->
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
        <div class="more-item" @click="videoCall">
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
    <DialogComponent v-if="dialogShow" :dialog="dialog"></DialogComponent>
    <CallVideoComponent v-if="videoCallShow" @CANCEL_VIDEO_EVENT="cancelVideo"></CallVideoComponent>
    <CallVoiceComponent v-if="voiceCallShow" :isWebRTCConnect="isWebRTCConnect" :netcallDurationText="netcallDurationText" @CANCEL_VOICE_EVENT="cancelVoice"></CallVoiceComponent>
    <CallInformComponent v-if="informCallShow" :isCallType="isCallType" @ACCEPT_EVENT="acceptVoice" @REJECT_EVENT="rejectVoice"></CallInformComponent>
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
import CallVoiceComponent from './call-voice/call-voice.vue'
import CallInformComponent from './call-inform/call-inform.vue'
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
import DialogComponent from '../../module/dialog/dialog.vue'
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
      dialog: {
        type: 'double',
        title: ''
      },
      isWebRTCConnect: false,
      voiceCallShow: false,
      videoCallShow: false,
      informCallShow: false,
      callTimer: null,
      netcall: null,
      beCalledInfo: null,
      channelId: null,
      beCalling: false, // 通话中
      callType: null, // 通话类型
      beCallTimer: null,
      netcallDurationText: null, // 通话时间
      netcallDurationTimer: null, // 通话时间倒计时
      acceptAndWait: true, // 接收等待通话
      isCallType: false,
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
    Vmodel,
    CallVoiceComponent,
    CallInformComponent,
    DialogComponent
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
      this.netcall = this.$store.state.netcall
      Chat.historyMsgs(Chat.target.id).success(data => {
        this.messages = []
        data.msgs = data.msgs.reverse()
        if (Storage.customMsg) {
          data.msgs.push(Storage.customMsg)
        }
        console.log('20条消息', Storage.customMsg)
        data.msgs.forEach((message, index) => {
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
            case 'notification':
              content = message.text
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
            time: message.time,
            mark: false
          })
        })
        this.sessionsTime(this.messages)
        console.log(this.messages)
        Storage.customMsg = null
      })
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
      this.voiceCallShow = false
      this.videoCallShow = true
      // eslint-disable-next-line
      Call.sendCall(Storage.userInfo.account, WebRTC.NETCALL_TYPE_VIDEO).then(data => {
        console.log('发送通话成功，等待对方接听')
        console.log(data)
        this.callTimer = setTimeout(() => {
          if (!this.netcall.callAccepted) {
            Error.show('超时未接通')
            Call.hangup()
            clearTimeout(this.callTimer)
            this.videoCallShow = false
          }
        }, 1000 * 30)
      }).catch(data => {
        console.log(data)
        if (data && data.event.code === 11001) {
          Error.show('发起音视频通话请求失败，对方不在线')
          setTimeout(() => {
            clearTimeout(this.callTimer)
            Call.hangup()
            this.videoCallShow = false
          }, 2000)
        } else {
          Error.show(data.event.message)
          setTimeout(() => {
            clearTimeout(this.callTimer)
            Call.hangup()
            this.videoCallShow = false
          }, 2000)
        }
        // })
      }).catch((err) => {
        console.log('获取失败', err)
      })
    },
    // 音频通话
    voiceCall () {
      this.voiceCallShow = true
      // eslint-disable-next-line
      Call.sendCall(Storage.userInfo.account, WebRTC.NETCALL_TYPE_AUDIO).then(data => {
        console.log('发送通话成功，等待对方接听')
        console.log(data)
        this.callTimer = setTimeout(() => {
          if (!this.netcall.callAccepted) {
            Error.show('超时未接通')
            Call.hangup()
            this.voiceCallShow = false
          }
        }, 1000 * 30)
      }).catch(data => {
        if (data && data.event.code === 11001) {
          Error.show('发起音视频通话请求失败，对方不在线')
          setTimeout(() => {
            clearTimeout(this.callTimer)
            Call.hangup()
            this.voiceCallShow = false
          }, 2000)
        } else {
          Error.show(data.event.message)
          setTimeout(() => {
            clearTimeout(this.callTimer)
            Call.hangup()
            this.voiceCallShow = false
          }, 2000)
        }
      })
    },
    acceptVoice () {
      clearTimeout(this.beCallTimer)
      this.beCalling = false
      Call.callAcceptedResponse(this.beCalledInfo).then(() => {
        console.log('同意对方音视频请求成功')
        this.beCalling = true
        this.informCallShow = false
        if (this.isCallType) {
          this.voiceCallShow = true
        } else {
          this.videoCallShow = true
        }
        // 加个定时器 处理点击接听了 实际上对面杀进程了，没有callAccepted回调
        // this.acceptAndWait = true
        // setTimeout(() => {
        //   if (this.acceptAndWait) {
        //     console.log('通话建立过程超时')
        //     Call.hangup()
        //     this.informCallShow = false
        //     this.voiceCallShow = false
        //     this.acceptAndWait = false
        //   }
        // }, 45 * 1000)
      }).catch(err => {
        console.log(err)
        console.log('同意对方音视频通话失败，转为拒绝')
        Call.control({
          channelId: this.beCalledInfo.channelId,
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
        })
        Call.hangup()
        clearInterval(this.netcallDurationTimer)
        this.beCalledInfo = null
        console.log('接听失败', err)
        this.informCallShow = false
      })
    },
    rejectVoice () {
      clearTimeout(this.beCallTimer)
      Call.control({
        channelId: this.beCalledInfo.channelId,
        // eslint-disable-next-line
        command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
      })
      Call.callRejectResponse(this.beCalledInfo).then(data => {
        this.informCallShow = false
        this.beCalledInfo = null
        this.beCalling = false
      }).catch(err => {
        console.log(err)
        // 自己断网
        Call.hangup()
        this.beCalledInfo = null
        this.beCalling = false
      })
    },
    cancelVoice () {
      Call.hangup()
      clearTimeout(this.callTimer)
      clearTimeout(this.beCallTimer)
      clearInterval(this.netcallDurationTimer)
      this.voiceCallShow = false
    },
    cancelVideo () {
      Call.hangup()
      clearTimeout(this.callTimer)
      this.videoCallShow = false
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
    },
    // 通话显示时长
    startDurationTimer () {
      let netcallDuration = 0
      clearInterval(this.netcallDurationTimer)
      let netcallStartTime = (new Date()).getTime()
      this.netcallDurationTimer = setInterval(() => {
        let now = (new Date()).getTime()
        netcallDuration = now - netcallStartTime
        this.netcallDurationText = this.getDurationText(netcallDuration)
      }, 500)
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
        Error.show('摄像头不可用')
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
    // 监听收到消息
    '$store.state.message' (message) {
      console.log(message)
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
        case 'notification':
          content = message.text
          console.log('接收的音视频消息', content)
          break
      }
      this.messages.push({
        type: message.type,
        content: content,
        isMine: false,
        portrait: Chat.target.portrait,
        time: message.time
      })
      this.sessionsTime(this.messages)
      Chat.sessionUnread(message.sessionId)
    },
    // 监听收到呼叫的通知
    '$store.state.beCalling' (beCalling) {
      if (beCalling.channelId === this.channelId) return
      if (this.netcall.calling || this.beCalling) {
        console.log('我方正忙')
        Call.control({
          // eslint-disable-next-line
          command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY,
          channelId: beCalling.channelId
        })
        return
      }
      console.log(beCalling)
      // eslint-disable-next-line
      if (beCalling.type === 1 || beCalling.type === WebRTC.NETCALL_TYPE_AUDIO) {
        this.isCallType = true
      } else {
        this.isCallType = false
      }
      this.informCallShow = true
      this.beCalledInfo = beCalling
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
      clearTimeout(this.callTimer)
      console.log('对方拒绝音视频通话')
      Error.show('对方拒绝通话')
      Call.hangup()
      this.voiceCallShow = false
      // 发送本地消息
      // sendText()
    },
    // 监听对方接受通话
    '$store.state.callAccepted' (callAccepted) {
      clearTimeout(this.callTimer)
      this.callType = callAccepted.type
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
            Call.setVideoViewSize()
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
        Call.setVideoViewRemoteSize()
      }
      this.startOtherVoice()
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
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
          // agreeSwitchAudioToVideo()
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
          // switchAudioToVideo()
          break
        // NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
        // eslint-disable-next-line
        case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
          // switchVideoToAudio()
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
        // NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
        // NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
        // NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
        // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START 通知对方自己开始录制视频了
        // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP 通知对方自己结束录制视频了
      }
    },
    // 监听挂断通话
    '$store.state.hangup' (hangup) {
      // 判断需要挂断的通话是否是当前正在进行中的通话
      if (!this.beCalledInfo || this.beCalledInfo.channelId === hangup.channelId) {
        // 也可以直接调用hangup接口实现各种清除工作
        clearInterval(this.netcallDurationTimer)
        Call.hangup()
        this.voiceCallShow = false
        this.videoCallShow = false
        this.informCallShow = false
      }
    }
  }
}
</script>

<style lang="sass">
@import "./chat.scss";
</style>
