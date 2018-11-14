<template>
  <p class="container-text" ref="emoji" v-focus="onFocus" v-html="innerText" :contenteditable="canEdit" @focus="inputFocus" @blur="inputBlur"
    @input="changeText">
  </p>
</template>
<script>
// include dependence
export default {
  name: 'editDiv',
  props: {
    // value: {
    //   type: String,
    //   default: ''
    // },
    canEdit: {
      type: Boolean,
      default: true
    },
    onFocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      innerText: '',
      isLocked: false
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.$refs.emoji.focus()
    // })
  },
  directives: {
    focus: {
      inserted (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  methods: {
    inputFocus () {
      this.isLocked = true
    },
    inputBlur () {
      this.islocked = false
    },
    changeText () {
      this.$emit('INPUT_EVENT', this.$el.innerHTML)
    },
    handleInput (encode) {
      this.$refs.emoji.innerHTML = encode
      this.keepLastIndex(this.$refs.emoji)
    },
    selectImg (item) {
      let Img = `<img class="text-emoji" name="${item.name}" src="${item.file}" />`
      let obj = this.$refs.emoji
      let range, node
      if (!obj.hasfocus) {
        obj.focus()
      }
      if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0)
        range.collapse(false)
        node = range.createContextualFragment(Img)
        let c = node.lastChild
        range.insertNode(node)
        if (c) {
          range.setEndAfter(c)
          range.setStartAfter(c)
        }
        let j = window.getSelection()
        j.removeAllRanges()
        j.addRange(range)
      } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().pasteHTML(Img)
      }
      this.$emit('INPUT_EVENT', this.$el.innerHTML)
    },
    // 设置光标到最后
    keepLastIndex (obj) {
      if (window.getSelection) {
        let range = window.getSelection()// 创建range
        range.selectAllChildren(obj)// range 选择obj下所有子内容
        range.collapseToEnd()// 光标移至最后
      }
    }
  }
  // watch: {
  //   'value' (newValue) {
  //     this.innerText = newValue
  //     console.log(newValue)
  //     if (!this.isLocked || !this.innerText) {
  //       console.log(11111)
  //     }
  //   }
  // }
}

</script>
<style lang="scss" rel="stylesheet/scss">
  @import "./v-model.scss";
</style>
