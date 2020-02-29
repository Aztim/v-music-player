import Vue from 'vue'
import vuetify from './plugins/vuetify';
import Player from './Player.vue'
// import {Howl, Howler} from 'howler';

Vue.config.productionTip = false
// const {Howl, Howler} = require('howler');
// Vue.use(Howl, Howler)



new Vue({
  vuetify,
  render: h => h(Player)
}).$mount('#app')
