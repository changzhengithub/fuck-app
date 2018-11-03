<template>
  <!-- s 排序 -->
  <section class="test">
    <div class="test-navbar" ref="navBox">
      <ul class="navbar-list"  @touchstart="handleTouchStart($event)" @touchmove="handleTouchMove($event)" @touchend="handleTouchEnd($event)">
        <li class="list-item color-deep-grey" ref="rightNav" v-for="(item, index) in navList" :key="index">{{item}}</li>
      </ul>
      <div class="navbar-toast font-39 color-white" v-if="touchShow">{{touchChar}}</div>
    </div>
    <div class="test-content">
      <ul class="content-list" id="scroll" ref="leftList">
        <li class="list-char" ref="listItem" v-for="(item, index) in sortJson" :key="index">
          <div class="char-title font-36"><span>{{item.title}}</span></div>
          <ul class="char-list bg-white">
            <li class="list-friend" v-for="(friend, index) in item.arr" :key="index">
              <div class="friend-content border-bottom-1">
                <div class="content-portrait">
                  <img :src="friend.avatar">
                </div>
                <div class="content-detail">
                  <p class="font-33 color-blue">
                    <span>{{friend.nick ? friend.nick : friend.account}}</span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-cong"></use>
                    </svg>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
  <!-- e 排序 -->
</template>

<script>
import {strChineseFirstPY, oMultiDiff} from '../../class/Initial.string.js'
export default {
  name: 'TestComponent',
  props: ['dataArr'],
  data () {
    return {
      scrollNum: 0,
      currentNum: 0,
      navTop: 0,
      navWidth: 0,
      itemHeight: 0,
      itemWidth: 0,
      pageY: 0,
      pageX: 0,
      touchChar: '',
      touchShow: false,
      sortArr: [],
      sortJson: [],
      firstStrArr: [],
      friends: [],
      navList: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  mounted () {
    console.log(this.dataArr)
    this.getData(this.dataArr)
  },
  methods: {
    getData (dataArr) {
      console.log(dataArr)
      dataArr.forEach(item => {
        let preproccessName = item.nick ? item.nick : item.account
        item.upCase = this.getInitial(preproccessName)
      })
      this.sortJson = this.getSortList(dataArr)
    },
    getInitial (str) {
      if (!str) return str
      if (typeof (str) !== 'string') str = str.toString()
      let resultStr = ''
      let firstChar = str.charAt(0)
      let uniCode = firstChar.charCodeAt(0)
      if (uniCode > 40869 || uniCode < 19968) return str
      for (let i = 0; i < str.length; i++) {
        let ch = str.charAt(i)
        resultStr += this.checkCh(ch)
      }
      return resultStr
    },
    checkCh (ch) {
      let uni = ch.charCodeAt(0)
      if (uni > 40869 || uni < 19968) {
        return ch
      }
      return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)))
    },
    getSortList (arr) {
      let sortJson = []
      let sortArr = []
      for (let i = 0; i < this.navList.length; i++) {
        sortJson[i] = {}
        sortJson[i].arr = []
        sortJson[i].title = this.navList[i]
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].upCase.charAt(0) === this.navList[i]) {
            sortJson[i].arr.push(arr[j])
          }
        }
      }
      for (let i = 0; i < arr.length; i++) {
        let reg = new RegExp('[A-Za-z]+')
        if (!reg.test(arr[i].upCase.charAt(0))) {
          sortJson[0].arr.push(arr[i])
        }
      }
      sortJson.forEach((item, i) => {
        if (item.arr.length !== 0) {
          sortArr.push(item)
        }
      })
      return sortArr
    },
    selectChar (item) {
      this.touchShow = true
      this.touchChar = item
    },
    handleTouchStart (event) {
      event.preventDefault()
      this.itemHeight = this.$refs.rightNav[0].offsetHeight
      this.itemWidth = this.$refs.rightNav[0].offsetWidth
      this.navWidth = this.$refs.navBox.offsetLeft
      this.navTop = this.$refs.navBox.offsetTop
      this.navHeight = this.$refs.navBox.offsetHeight
      this.pageY = event.targetTouches[0].pageY
      this.pageX = event.targetTouches[0].pageX
      this.currentNum = Math.floor((this.pageY - this.navTop) / this.itemHeight)
      this.touchShow = true
      this.touchChar = event.target.innerText
      this.sortJson.forEach((item, i) => {
        if (item.title === this.touchChar) {
          this.$refs.listItem[i].scrollIntoView()
        }
      })
      scroll.scrollIntoView = this.$refs.listItem[this.scrollNum].offsetTop
      this.$refs.rightNav.forEach(item => {
        item.style.backgroundColor = 'transparent'
      })
      this.$refs.rightNav[this.currentNum].style.backgroundColor = '#f2f2f2'
    },
    handleTouchMove (event) {
      this.pageY = event.targetTouches[0].pageY
      this.pageX = event.targetTouches[0].pageX
      this.currentNum = Math.floor((this.pageY - this.navTop) / this.itemHeight)
      if (this.currentNum >= this.navList.length) this.currentNum = this.navList.length - 1
      if (this.currentNum <= 0) this.currentNum = 0
      this.touchChar = this.navList[this.currentNum]
      this.sortJson.forEach((item, i) => {
        if (item.title === this.touchChar) {
          this.$refs.listItem[i].scrollIntoView()
        }
      })
      if (this.pageY <= this.navTop) this.touchChar = this.navList[0]
      if (this.pageY >= this.navTop + this.navHeight) this.touchChar = this.navList[this.navList.length - 1]
      this.$refs.rightNav.forEach(item => {
        item.style.backgroundColor = 'transparent'
      })
      this.$refs.rightNav[this.currentNum].style.backgroundColor = '#f2f2f2'
    },
    handleTouchEnd () {
      this.$refs.rightNav[this.currentNum].style.backgroundColor = 'transparent'
      this.touchShow = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./contact-list.scss";
</style>
