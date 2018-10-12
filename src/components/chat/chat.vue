<template>
  <!-- s 好友聊天 -->
  <section class="chat" :class="{switchMore: switchMoreShow || switchEmojiShow}">
    <TitleComponent :title="title" @OTHER_EVENT="gotoPage('personal-info')"></TitleComponent>
    <div class="chat-time">
      <div class="time font-24 color-white">15:09</div>
    </div>
    <ul class="chat-list">
      <li class="list-item padding-horizontal-30 clear" v-for="(item, index) in messages" :key="index">
        <div class="item-portrait" :class="item.isMine ? 'fr' : 'fl'">
          <img :src="item.portrait">
        </div>
        <div class="item-content" :class="item.isMine ? 'fr' : 'fl'">
          <div class="content-text" :class="item.isMine ? 'arrow-blue-right' : 'arrow-white-left'"  v-if="item.type == 'text'">
            <TextMessage :content="item"></TextMessage>
          </div>
          <div class="content-voice" :class="[item.isMine ? 'arrow-blue-right' : 'arrow-white-left', item.isMine ? 'content-voice-right' : 'content-voice-left']" v-else-if="item.type == 'voice'">
            <i class="iconfont font-33" :class="item.isMine ? 'icon-audio-right' : 'icon-yuyin'"></i>
            <div class="voice-seconds voice-seconds-right font-30 color-light-grey">15"</div>
          </div>
          <div class="content-img" :class="item.isMine ? 'arrow-white-right' : 'arrow-white-left'" v-else-if="item.type == 'image'">
            <img src="../../assets/images/ivint.png">
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
              <p class="detail-title">{{item.content.title}}信用报告</p>
            </div>
            <div class="credit-title">信用报告</div>
          </div>
          <div class="content-card" :class="item.isMine ? 'arrow-white-right' : 'arrow-white-left'" v-else-if="item.type == 'mp'">
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
      </li>
    </ul>
    <div class="chat-input">
      <div class="input-eara">
        <i class="iconfont" :class="inputType ? 'icon-jianpan' : 'icon-yuyin1'" @click="toggleInputType"></i>
        <div class="eara-content bg-white">
          <div class="content-text" v-if="!inputType">
            <input type="text" v-model="inputText">
          </div>
          <div class="content-voice" v-if="inputType">
            <span>按住说话</span>
          </div>
        </div>
        <i class="iconfont icon-xiaolian" @click="switchEmoji"></i>
        <div class="eara-add">
          <i class="iconfont icon-jiahao" v-if="!inputText" @click="switchMore"></i>
          <button class="add-send bg-blue" v-else-if="inputText"><div class="color-white font-27" @click="sendText">发送</div></button>
        </div>
      </div>
      <div class="input-facebread bg-white" v-if="switchEmojiShow">
        <div class="facebread-content">
          <div class="content-item" v-if="facebread == 'small'">
            <ul class="small-list">
              <li class="list-item" v-for="(item, index) in emojiArr" :key="index" @click="selectSmall(item.file)">
                <img :src="'../../../static/img/emoji/' + item.file">
              </li>
            </ul>
          </div>
          <div class="content-item" v-if="facebread == 'rooster'">
            <ul class="rooster-list">
              <li class="list-item" v-for="(item, index) in ltArr" :key="index">
                <img :src="'../../../static/img/lt/'+item">
              </li>
            </ul>
          </div>
          <div class="content-item" v-if="facebread == 'dog'">
            <ul class="dog-list">
              <li class="list-item" v-for="(item, index) in xxyArr" :key="index">
                <img :src="'../../../static/img/xxy/'+item">
              </li>
            </ul>
          </div>
          <div class="content-item" v-if="facebread == 'rabbit'">
            <ul class="rabbit-list">
              <li class="list-item" v-for="(item, index) in ajmdArr" :key="index">
                <img :src="'../../../static/img/ajmd/'+item">
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
        <div class="more-item">
          <div class="item-icon bg-white">
            <i class="iconfont icon-phone1 font-51"></i>
          </div>
          <p class="font-24">语音通话</p>
        </div>
        <div class="more-item" @click="gotoPage('wanna-borrow')">
          <div class="item-icon bg-white">
            <i class="iconfont icon-jie font-51"></i>
          </div>
          <p class="font-24">我要借</p>
        </div>
        <div class="more-item" @click="gotoPage('wanna-borrow')">
          <div class="item-icon bg-white">
            <i class="iconfont icon-qian font-51"></i>
          </div>
          <p class="font-24">打欠条</p>
        </div>
        <div class="more-item" @click="gotoPage('friend-transfer')">
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
    <ModalComponent v-show="modalShow" @CLOSE_EVENT="closeModal">
      <OpenPictureComponent v-if="openPictureShow" @TAKE_PICTURE_EVENT="takePicture" @SELECT_PICTURE_EVENT="selectPicture"></OpenPictureComponent>
      <CallComponent v-if="callShow" @VIDEO_CALL_EVENT="videoCall" @VOICE_CALL_EVENT="voiceCall" @CANCEL_EVENT="closeModal"></CallComponent>
    </ModalComponent>
  </section>
  <!-- e 好友聊天 -->
</template>

<script>
import TextMessage from './message/message.vue'
import OpenPictureComponent from './open-picture/open-picture.vue'
import CallComponent from './call/call.vue'
// include dependence
import Account from '../../class/Account.class.js'
import Chat from '../../class/Chat.class.js'
import Replace from '../../class/Replace.class.js'
import Router from '../../class/Router.class.js'
import Storage from '../../class/Storage.class.js'
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
      inputText: '',
      personalInfo: null,
      inputType: false,
      switchEmojiShow: false,
      switchMoreShow: false,
      modalShow: false,
      openPictureShow: false,
      callShow: false,
      // emoji
      emojiArr: [{name: '[大笑]', file: 'emoji_0.png'}, {name: '[可爱]', file: 'emoji_01.png'}, {name: '[色]', file: 'emoji_02.png'}, {name: '[嘘]', file: 'emoji_03.png'}, {name: '[亲]', file: 'emoji_04.png'}, {name: '[呆]', file: 'emoji_05.png'}, {name: '[口水]', file: 'emoji_06.png'}, {name: '[汗]', file: 'emoji_145.png'}, {name: '[呲牙]', file: 'emoji_07.png'}, {name: '[鬼脸]', file: 'emoji_08.png'}, {name: '[害羞]', file: 'emoji_09.png'}, {name: '[偷笑]', file: 'emoji_10.png'}, {name: '[调皮]', file: 'emoji_11.png'}, {name: '[可怜]', file: 'emoji_12.png'}, {name: '[敲]', file: 'emoji_13.png'}, {name: '[惊讶]', file: 'emoji_14.png'}, {name: '[流感]', file: 'emoji_15.png'}, {name: '[委屈]', file: 'emoji_16.png'}, {name: '[流泪]', file: 'emoji_17.png'}, {name: '[嚎哭]', file: 'emoji_18.png'}, {name: '[惊恐]', file: 'emoji_19.png'}, {name: '[怒]', file: 'emoji_20.png'}, {name: '[酷]', file: 'emoji_21.png'}, {name: '[不说]', file: 'emoji_22.png'}, {name: '[鄙视]', file: 'emoji_23.png'}, {name: '[阿弥陀佛]', file: 'emoji_24.png'}, {name: '[奸笑]', file: 'emoji_25.png'}, {name: '[睡着]', file: 'emoji_26.png'}, {name: '[口罩]', file: 'emoji_27.png'}, {name: '[努力]', file: 'emoji_28.png'}, {name: '[抠鼻孔]', file: 'emoji_29.png'}, {name: '[疑问]', file: 'emoji_30.png'}, {name: '[怒骂]', file: 'emoji_31.png'}, {name: '[晕]', file: 'emoji_32.png'}, {name: '[呕吐]', file: 'emoji_33.png'}, {name: '[拜一拜]', file: 'emoji_160.png'}, {name: '[惊喜]', file: 'emoji_161.png'}, {name: '[流汗]', file: 'emoji_162.png'}, {name: '[卖萌]', file: 'emoji_163.png'}, {name: '[默契眨眼]', file: 'emoji_164.png'}, {name: '[烧香拜佛]', file: 'emoji_165.png'}, {name: '[晚安]', file: 'emoji_166.png'}, {name: '[强]', file: 'emoji_34.png'}, {name: '[弱]', file: 'emoji_35.png'}, {name: '[OK]', file: 'emoji_36.png'}, {name: '[拳头]', file: 'emoji_37.png'}, {name: '[胜利]', file: 'emoji_38.png'}, {name: '[鼓掌]', file: 'emoji_39.png'}, {name: '[握手]', file: 'emoji_200.png'}, {name: '[发怒]', file: 'emoji_40.png'}, {name: '[骷髅]', file: 'emoji_41.png'}, {name: '[便便]', file: 'emoji_42.png'}, {name: '[火]', file: 'emoji_43.png'}, {name: '[溜]', file: 'emoji_44.png'}, {name: '[爱心]', file: 'emoji_45.png'}, {name: '[心碎]', file: 'emoji_46.png'}, {name: '[钟情]', file: 'emoji_47.png'}, {name: '[唇]', file: 'emoji_48.png'}, {name: '[戒指]', file: 'emoji_49.png'}, {name: '[钻石]', file: 'emoji_50.png'}, {name: '[太阳]', file: 'emoji_51.png'}, {name: '[有时晴]', file: 'emoji_52.png'}, {name: '[多云]', file: 'emoji_53.png'}, {name: '[雷]', file: 'emoji_54.png'}, {name: '[雨]', file: 'emoji_55.png'}, {name: '[雪花]', file: 'emoji_56.png'}, {name: '[爱人]', file: 'emoji_57.png'}, {name: '[帽子]', file: 'emoji_58.png'}, {name: '[皇冠]', file: 'emoji_59.png'}, {name: '[篮球]', file: 'emoji_60.png'}, {name: '[足球]', file: 'emoji_61.png'}, {name: '[垒球]', file: 'emoji_62.png'}, {name: '[网球]', file: 'emoji_63.png'}, {name: '[台球]', file: 'emoji_64.png'}, {name: '[咖啡]', file: 'emoji_65.png'}, {name: '[啤酒]', file: 'emoji_66.png'}, {name: '[干杯]', file: 'emoji_67.png'}, {name: '[柠檬汁]', file: 'emoji_68.png'}, {name: '[餐具]', file: 'emoji_69.png'}, {name: '[汉堡]', file: 'emoji_70.png'}, {name: '[鸡腿]', file: 'emoji_71.png'}, {name: '[面条]', file: 'emoji_72.png'}, {name: '[冰淇淋]', file: 'emoji_73.png'}, {name: '[沙冰]', file: 'emoji_74.png'}, {name: '[生日蛋糕]', file: 'emoji_75.png'}, {name: '[蛋糕]', file: 'emoji_76.png'}, {name: '[糖果]', file: 'emoji_77.png'}, {name: '[葡萄]', file: 'emoji_78.png'}, {name: '[西瓜]', file: 'emoji_79.png'}, {name: '[光碟]', file: 'emoji_80.png'}, {name: '[手机]', file: 'emoji_81.png'}, {name: '[电话]', file: 'emoji_82.png'}, {name: '[电视]', file: 'emoji_83.png'}, {name: '[声音开启]', file: 'emoji_84.png'}, {name: '[声音关闭]', file: 'emoji_85.png'}, {name: '[铃铛]', file: 'emoji_86.png'}, {name: '[锁头]', file: 'emoji_87.png'}, {name: '[放大镜]', file: 'emoji_88.png'}, {name: '[灯泡]', file: 'emoji_89.png'}, {name: '[锤头]', file: 'emoji_90.png'}, {name: '[烟]', file: 'emoji_91.png'}, {name: '[炸弹]', file: 'emoji_92.png'}, {name: '[枪]', file: 'emoji_93.png'}, {name: '[刀]', file: 'emoji_94.png'}, {name: '[药]', file: 'emoji_95.png'}, {name: '[打针]', file: 'emoji_96.png'}, {name: '[钱袋]', file: 'emoji_97.png'}, {name: '[钞票]', file: 'emoji_98.png'}, {name: '[银行卡]', file: 'emoji_99.png'}, {name: '[手柄]', file: 'emoji_100.png'}, {name: '[麻将]', file: 'emoji_101.png'}, {name: '[调色板]', file: 'emoji_102.png'}, {name: '[电影]', file: 'emoji_103.png'}, {name: '[麦克风]', file: 'emoji_104.png'}, {name: '[耳机]', file: 'emoji_105.png'}, {name: '[音乐]', file: 'emoji_106.png'}, {name: '[吉他]', file: 'emoji_107.png'}, {name: '[火箭]', file: 'emoji_108.png'}, {name: '[飞机]', file: 'emoji_109.png'}, {name: '[火车]', file: 'emoji_110.png'}, {name: '[公交]', file: 'emoji_111.png'}, {name: '[轿车]', file: 'emoji_112.png'}, {name: '[出租车]', file: 'emoji_113.png'}, {name: '[警车]', file: 'emoji_114.png'}, {name: '[自行车]', file: 'emoji_115.png'}],
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
    CallComponent,
    TextMessage
    // include components
  },
  created () {
    this.init()
    this.getltArr()
  },
  methods: {
    init () {
      console.log(Storage.userInfo)
      if (Storage.userInfo) {
        this.title.contentText = Storage.userInfo.name
      }
      Chat.historyMsgs(Chat.target.id).success(data => {
        console.log(data)
        data.msgs = data.msgs.reverse()
        data.msgs.forEach(message => {
          let custom = {}
          let isMine = true
          let avator = Account.portrait
          if (message.content) {
            custom = JSON.parse(message.content)
          }
          let content = null
          switch (message.type) {
            case 'custom':
              message.type = custom.data.type
              // custom.data.id = Replace.mask(custom.data.id, 3, 4, '*')
              content = custom.data
              break
            case 'text':
              content = message.text
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
            mark: false
          })
        })
      })
    },
    getltArr () {
      for (let i = 1; i < 20; i++) {
        this.ltArr.push('lt0' + (i >= 10 ? i : '0' + i) + '.png')
      }
      for (let i = 1; i < 48; i++) {
        this.ajmdArr.push('ajmd0' + (i >= 10 ? i : '0' + i) + '.png')
      }
      for (let i = 1; i < 40; i++) {
        this.xxyArr.push('xxy0' + (i >= 10 ? i : '0' + i) + '.png')
      }
    },
    toggleInputType () {
      this.inputType = !this.inputType
    },
    switchMore () {
      this.switchEmojiShow = false
      this.switchMoreShow = !this.switchMoreShow
    },
    switchEmoji () {
      this.switchMoreShow = false
      this.switchEmojiShow = !this.switchEmojiShow
    },
    selectFacebread (facebread) {
      this.facebread = facebread
    },
    selectSmall (item, index) {},
    openPictureModal () {
      this.modalShow = true
      this.openPictureShow = true
    },
    callModal () {
      this.modalShow = true
      this.callShow = true
    },
    closeModal () {
      this.modalShow = false
      this.openPictureShow = false
      this.callShow = false
    },
    gotoPage (page) {
      Storage.origin = page
      Router.push(page)
    },
    videoCall () {},
    voiceCall () {},
    takePicture () {},
    selectPicture () {},
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
        })
    }
  },
  watch: {
    '$store.state.message': function (message) {
      let custom = {}
      if (message.content) {
        custom = JSON.parse(message.content)
      }
      let content = null
      switch (message.type) {
        case 'custom':
          message.type = custom.data.type
          custom.data.id = Replace.mask(custom.data.id, 3, 4, '*')
          content = custom.data
          break
        case 'text':
          content = message.text
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
      console.log(this.messages)
      Chat.sessionUnread(message.sessionId)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./chat.scss";
</style>
