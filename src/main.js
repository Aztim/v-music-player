import Vue from 'vue'
import vuetify from './plugins/vuetify';
import Player from './Player.vue'
import numbersFilter from '@/filters/numbers.filter'
import minutesFilter from '@/filters/minutes.filter'
import '@/assets/css/app.css'

// import { Howl, Howler } from 'howler'

Vue.config.productionTip = false
Vue.filter('numbers', numbersFilter)
Vue.filter('minutes', minutesFilter)

new Vue({
  vuetify,
  render: h => h(Player)
}).$mount('#app')
