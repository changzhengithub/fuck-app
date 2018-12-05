<template>
  <!-- s  -->
  <section class="message" :class="content.isMine ? 'text-right' : 'text-left'">
    <p class="message-text font-30" v-html="emojiDecode(content.content)"></p>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
export default {
  name: 'MessageComponent',
  props: ['content'],
  data () {
    return {
      emojiArr: [{name: '[大笑]', file: require('../../assets/images/emoji/emoji_0.png')}, {name: '[可爱]', file: require('../../assets/images/emoji/emoji_01.png')}, {name: '[色]', file: require('../../assets/images/emoji/emoji_02.png')}, {name: '[嘘]', file: require('../../assets/images/emoji/emoji_03.png')}, {name: '[亲]', file: require('../../assets/images/emoji/emoji_04.png')}, {name: '[呆]', file: require('../../assets/images/emoji/emoji_05.png')}, {name: '[口水]', file: require('../../assets/images/emoji/emoji_06.png')}, {name: '[汗]', file: require('../../assets/images/emoji/emoji_145.png')}, {name: '[呲牙]', file: require('../../assets/images/emoji/emoji_07.png')}, {name: '[鬼脸]', file: require('../../assets/images/emoji/emoji_08.png')}, {name: '[害羞]', file: require('../../assets/images/emoji/emoji_09.png')}, {name: '[偷笑]', file: require('../../assets/images/emoji/emoji_10.png')}, {name: '[调皮]', file: require('../../assets/images/emoji/emoji_11.png')}, {name: '[可怜]', file: require('../../assets/images/emoji/emoji_12.png')}, {name: '[敲]', file: require('../../assets/images/emoji/emoji_13.png')}, {name: '[惊讶]', file: require('../../assets/images/emoji/emoji_14.png')}, {name: '[流感]', file: require('../../assets/images/emoji/emoji_15.png')}, {name: '[委屈]', file: require('../../assets/images/emoji/emoji_16.png')}, {name: '[流泪]', file: require('../../assets/images/emoji/emoji_17.png')}, {name: '[嚎哭]', file: require('../../assets/images/emoji/emoji_18.png')}, {name: '[惊恐]', file: require('../../assets/images/emoji/emoji_19.png')}, {name: '[怒]', file: require('../../assets/images/emoji/emoji_20.png')}, {name: '[酷]', file: require('../../assets/images/emoji/emoji_21.png')}, {name: '[不说]', file: require('../../assets/images/emoji/emoji_22.png')}, {name: '[鄙视]', file: require('../../assets/images/emoji/emoji_23.png')}, {name: '[阿弥陀佛]', file: require('../../assets/images/emoji/emoji_24.png')}, {name: '[奸笑]', file: require('../../assets/images/emoji/emoji_25.png')}, {name: '[睡着]', file: require('../../assets/images/emoji/emoji_26.png')}, {name: '[口罩]', file: require('../../assets/images/emoji/emoji_27.png')}, {name: '[努力]', file: require('../../assets/images/emoji/emoji_28.png')}, {name: '[抠鼻孔]', file: require('../../assets/images/emoji/emoji_29.png')}, {name: '[疑问]', file: require('../../assets/images/emoji/emoji_30.png')}, {name: '[怒骂]', file: require('../../assets/images/emoji/emoji_31.png')}, {name: '[晕]', file: require('../../assets/images/emoji/emoji_32.png')}, {name: '[呕吐]', file: require('../../assets/images/emoji/emoji_33.png')}, {name: '[拜一拜]', file: require('../../assets/images/emoji/emoji_160.png')}, {name: '[惊喜]', file: require('../../assets/images/emoji/emoji_161.png')}, {name: '[流汗]', file: require('../../assets/images/emoji/emoji_162.png')}, {name: '[卖萌]', file: require('../../assets/images/emoji/emoji_163.png')}, {name: '[默契眨眼]', file: require('../../assets/images/emoji/emoji_164.png')}, {name: '[烧香拜佛]', file: require('../../assets/images/emoji/emoji_165.png')}, {name: '[晚安]', file: require('../../assets/images/emoji/emoji_166.png')}, {name: '[强]', file: require('../../assets/images/emoji/emoji_34.png')}, {name: '[弱]', file: require('../../assets/images/emoji/emoji_35.png')}, {name: '[OK]', file: require('../../assets/images/emoji/emoji_36.png')}, {name: '[拳头]', file: require('../../assets/images/emoji/emoji_37.png')}, {name: '[胜利]', file: require('../../assets/images/emoji/emoji_38.png')}, {name: '[鼓掌]', file: require('../../assets/images/emoji/emoji_39.png')}, {name: '[握手]', file: require('../../assets/images/emoji/emoji_200.png')}, {name: '[发怒]', file: require('../../assets/images/emoji/emoji_40.png')}, {name: '[骷髅]', file: require('../../assets/images/emoji/emoji_41.png')}, {name: '[便便]', file: require('../../assets/images/emoji/emoji_42.png')}, {name: '[火]', file: require('../../assets/images/emoji/emoji_43.png')}, {name: '[溜]', file: require('../../assets/images/emoji/emoji_44.png')}, {name: '[爱心]', file: require('../../assets/images/emoji/emoji_45.png')}, {name: '[心碎]', file: require('../../assets/images/emoji/emoji_46.png')}, {name: '[钟情]', file: require('../../assets/images/emoji/emoji_47.png')}, {name: '[唇]', file: require('../../assets/images/emoji/emoji_48.png')}, {name: '[戒指]', file: require('../../assets/images/emoji/emoji_49.png')}, {name: '[钻石]', file: require('../../assets/images/emoji/emoji_50.png')}, {name: '[太阳]', file: require('../../assets/images/emoji/emoji_51.png')}, {name: '[有时晴]', file: require('../../assets/images/emoji/emoji_52.png')}, {name: '[多云]', file: require('../../assets/images/emoji/emoji_53.png')}, {name: '[雷]', file: require('../../assets/images/emoji/emoji_54.png')}, {name: '[雨]', file: require('../../assets/images/emoji/emoji_55.png')}, {name: '[雪花]', file: require('../../assets/images/emoji/emoji_56.png')}, {name: '[爱人]', file: require('../../assets/images/emoji/emoji_57.png')}, {name: '[帽子]', file: require('../../assets/images/emoji/emoji_58.png')}, {name: '[皇冠]', file: require('../../assets/images/emoji/emoji_59.png')}, {name: '[篮球]', file: require('../../assets/images/emoji/emoji_60.png')}, {name: '[足球]', file: require('../../assets/images/emoji/emoji_61.png')}, {name: '[垒球]', file: require('../../assets/images/emoji/emoji_62.png')}, {name: '[网球]', file: require('../../assets/images/emoji/emoji_63.png')}, {name: '[台球]', file: require('../../assets/images/emoji/emoji_64.png')}, {name: '[咖啡]', file: require('../../assets/images/emoji/emoji_65.png')}, {name: '[啤酒]', file: require('../../assets/images/emoji/emoji_66.png')}, {name: '[干杯]', file: require('../../assets/images/emoji/emoji_67.png')}, {name: '[柠檬汁]', file: require('../../assets/images/emoji/emoji_68.png')}, {name: '[餐具]', file: require('../../assets/images/emoji/emoji_69.png')}, {name: '[汉堡]', file: require('../../assets/images/emoji/emoji_70.png')}, {name: '[鸡腿]', file: require('../../assets/images/emoji/emoji_71.png')}, {name: '[面条]', file: require('../../assets/images/emoji/emoji_72.png')}, {name: '[冰淇淋]', file: require('../../assets/images/emoji/emoji_73.png')}, {name: '[沙冰]', file: require('../../assets/images/emoji/emoji_74.png')}, {name: '[生日蛋糕]', file: require('../../assets/images/emoji/emoji_75.png')}, {name: '[蛋糕]', file: require('../../assets/images/emoji/emoji_76.png')}, {name: '[糖果]', file: require('../../assets/images/emoji/emoji_77.png')}, {name: '[葡萄]', file: require('../../assets/images/emoji/emoji_78.png')}, {name: '[西瓜]', file: require('../../assets/images/emoji/emoji_79.png')}, {name: '[光碟]', file: require('../../assets/images/emoji/emoji_80.png')}, {name: '[手机]', file: require('../../assets/images/emoji/emoji_81.png')}, {name: '[电话]', file: require('../../assets/images/emoji/emoji_82.png')}, {name: '[电视]', file: require('../../assets/images/emoji/emoji_83.png')}, {name: '[声音开启]', file: require('../../assets/images/emoji/emoji_84.png')}, {name: '[声音关闭]', file: require('../../assets/images/emoji/emoji_85.png')}, {name: '[铃铛]', file: require('../../assets/images/emoji/emoji_86.png')}, {name: '[锁头]', file: require('../../assets/images/emoji/emoji_87.png')}, {name: '[放大镜]', file: require('../../assets/images/emoji/emoji_88.png')}, {name: '[灯泡]', file: require('../../assets/images/emoji/emoji_89.png')}, {name: '[锤头]', file: require('../../assets/images/emoji/emoji_90.png')}, {name: '[烟]', file: require('../../assets/images/emoji/emoji_91.png')}, {name: '[炸弹]', file: require('../../assets/images/emoji/emoji_92.png')}, {name: '[枪]', file: require('../../assets/images/emoji/emoji_93.png')}, {name: '[刀]', file: require('../../assets/images/emoji/emoji_94.png')}, {name: '[药]', file: require('../../assets/images/emoji/emoji_95.png')}, {name: '[打针]', file: require('../../assets/images/emoji/emoji_96.png')}, {name: '[钱袋]', file: require('../../assets/images/emoji/emoji_97.png')}, {name: '[钞票]', file: require('../../assets/images/emoji/emoji_98.png')}, {name: '[银行卡]', file: require('../../assets/images/emoji/emoji_99.png')}, {name: '[手柄]', file: require('../../assets/images/emoji/emoji_100.png')}, {name: '[麻将]', file: require('../../assets/images/emoji/emoji_101.png')}, {name: '[调色板]', file: require('../../assets/images/emoji/emoji_102.png')}, {name: '[电影]', file: require('../../assets/images/emoji/emoji_103.png')}, {name: '[麦克风]', file: require('../../assets/images/emoji/emoji_104.png')}, {name: '[耳机]', file: require('../../assets/images/emoji/emoji_105.png')}, {name: '[音乐]', file: require('../../assets/images/emoji/emoji_106.png')}, {name: '[吉他]', file: require('../../assets/images/emoji/emoji_107.png')}, {name: '[火箭]', file: require('../../assets/images/emoji/emoji_108.png')}, {name: '[飞机]', file: require('../../assets/images/emoji/emoji_109.png')}, {name: '[火车]', file: require('../../assets/images/emoji/emoji_110.png')}, {name: '[公交]', file: require('../../assets/images/emoji/emoji_111.png')}, {name: '[轿车]', file: require('../../assets/images/emoji/emoji_112.png')}, {name: '[出租车]', file: require('../../assets/images/emoji/emoji_113.png')}, {name: '[警车]', file: require('../../assets/images/emoji/emoji_114.png')}, {name: '[自行车]', file: require('../../assets/images/emoji/emoji_115.png')}]
    }
  },
  components: {
    // include components
  },
  // computed: {
  //   content (newValue) {
  //     this.setHtml()
  //   }
  // },
  methods: {
    setHtml () {
      let html = this.emojiDecode(this.content.content)
      // this.content.forEach(item => {
      //   if (item) {
      //     html += `<span>${item}</span>`
      //   } else {
      //     html += `<img src="${item}">`
      //   }
      // })
      return html
    },
    emojiDecode (inputEmojiText) {
      let reg1 = /\[([^\][]*)\]/g
      let emojiMatch = inputEmojiText.match(reg1) || '[]'
      for (var j = 0; j < emojiMatch.length; ++j) {
        let imgSrc = null
        for (let i = 0; i < this.emojiArr.length; i++) {
          if (emojiMatch[j] === this.emojiArr[i].name) {
            imgSrc = this.emojiArr[i].file
          }
        }
        inputEmojiText = inputEmojiText.replace(emojiMatch[j], `<img class="text-emoji" src="${imgSrc}" />`)
      }
      return inputEmojiText
    }
  }
}
</script>

<style lang="sass">
@import "./message.scss";
</style>
