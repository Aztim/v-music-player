import Vue from 'vue'
import vuetify from './plugins/vuetify';
import Player from './Player.vue'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Player)
}).$mount('#app')
