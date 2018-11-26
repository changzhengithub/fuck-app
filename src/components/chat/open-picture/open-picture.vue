<template>
  <!-- s  -->
  <section class="open-picture bg-white">
    <div class="picture-title padding-horizontal-30"><span>图片</span></div>
    <div class="picture-switch padding-horizontal-30 border-bottom-1" @click="takePicture">
      <span>拍摄</span>
      <input class="switch-shoot" type="file" accept="image/* capture=camera">
    </div>
    <div class="picture-switch padding-horizontal-30">
      <span>从手机相册选择</span>
      <input class="switch-camera" type="file" ref="inputFile" accept="audio/*" @change="getImageFile($event)">
    </div>
  </section>
  <!-- e  -->
</template>

<script>
// include dependence
import Chat from '../../../class/Chat.class.js'
export default {
  name: 'OpenPictureComponent',
  data () {
    return {
      imgDataUrl: ''
      // start params
      // end params
    }
  },
  components: {
    // include components
  },
  methods: {
    takePicture () {
      this.$emit('TAKE_PICTURE_EVENT')
    },
    selectPicture () {
      this.$emit('SELECT_PICTURE_EVENT')
    },
    getImageFile (e) {
      Chat.previewFile(this.$refs.inputFile).success(data => {
        console.log(data)
        alert(data.url)
      })
      // Chat.sendFile(Chat.target.id, 'image', this.$refs.inputFile).success(data => {
      //   console.log(data)
      //   this.$emit('SELECT_PICTURE_EVENT', data)
      // })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./open-picture.scss";
</style>
