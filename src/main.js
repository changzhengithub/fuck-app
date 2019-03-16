// import Vue from 'vue'
import App from './App'
import Modal from './Modal.vue'
import Call from './Call.vue'
import router from './router/router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import './main.scss'

require('es6-promise').polyfill()
Es6Promise.polyfill()
// import plus from 'vue-h5-plus'
// Vue.use(plus)
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/logo.png',
  loading: '../static/img/logo.png'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.call = new Vue({
  el: '#call',
  store,
  render: f => f(Call)
})

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
