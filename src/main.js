import Vue from 'vue'
// import Player from './Player.vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
// import {Howl, Howler} from 'howler';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
