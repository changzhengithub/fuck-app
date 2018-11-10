import Vue from 'vue'
import App from './App'
import Modal from './Modal.vue'
import router from './router/router'
import store from './store/index'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import './main.scss'

require('es6-promise').polyfill()
Es6Promise.polyfill()
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.modal = new Vue({
  el: '#modal',
  store,
  render: f => f(Modal)
})

window.app = new Vue({
  el: '#app',
  router,
  store,
  render: f => f(App)
})
