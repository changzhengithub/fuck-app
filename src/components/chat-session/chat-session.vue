<template>
  <!-- s  -->
  <section class="chat-session">
    <ul class="session-list" id="chat-list">
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
            <div class="content-notification" :class="[item.isMine ? 'arrow-blue-right' : 'arrow-white-left', item.isMine ? 'content-notification-right' : 'content-notification-left']"  v-if="item.type == 'notification'">
              <div class="notification-none">
                <i class="iconfont font-30" :class="item.content.toggleType ? 'icon-shouye' : 'icon-sousuo'"></i>
                <span class="font-30">{{item.content.duration}}</span>
              </div>
            </div>
            <div class="content-voice" :class="[item.isMine ? 'arrow-blue-right' : 'arrow-white-left']" v-else-if="item.type == 'audio'" @click="playAudio(item.content, index)">
              <div class="voice-left" v-if="!item.isMine">
                <i class="iconfont icon-yuyin font-33"></i>
                <div class="voice-seconds font-30 color-light-grey">{{item.content.dur}}"</div>
                <!-- <audio :src="item.content.mp3Url"></audio> -->
              </div>
              <div class="voice-right" v-else-if="item.isMine">
                <!-- <audio :src="item.content.mp3Url"></audio> -->
                <div class="voice-seconds font-30 color-white">{{item.content.dur}}"</div>
                <i class="iconfont icon-audio-right font-33"></i>
              </div>
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
  </section>
  <!-- e  -->
</template>

<script>
import TextMessage from '../message/message.vue'
// include dependence
import Router from '../../class/Router.class.js'
export default {
  name: 'ChatSessionComponent',
  props: ['messages'],
  data () {
    return {
      audioTimer: null,
      isAudioPaly: false
      // start params
      // end params
    }
  },
  components: {
    TextMessage
    // include components
  },
  methods: {
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
    gotoPage (page) {
      Router.push(page)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./chat-session.scss";
</style>
