<template>
  <div>
    <v-toolbar text height=90>
      <v-btn text icon @click="toggleMute">
        <template v-if="!this.muted">
          <v-icon v-if="this.volume >= 0.5">mdi-volume-high</v-icon>
          <v-icon v-else-if="this.volume > 0">mdi-volume-medium</v-icon>
          <v-icon v-else>mdi-volume-variant-off</v-icon>
        </template>
        <v-icon v-show="this.muted">volume_off</v-icon>
      </v-btn>
      <v-slider v-model="volume" @input="updateVolume(volume)" max="1" step="0.1"></v-slider>
      {{ this.volume * 100 + '%' }}
      <v-spacer></v-spacer>
      <v-btn outlined fab small color="light-blue" @click="skipTrack('prev')">
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-btn outlined fab small color="light-blue" @click="stopTrack">
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-btn outlined fab color="light-blue" @click="playTrack()">
        <v-icon large>mdi-play</v-icon>
      </v-btn>
      <v-btn outlined fab small color="light-blue" @click="pauseTrack">
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn outlined fab small color="light-blue" @click="skipTrack('next')">
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text icon @click="toggleLoop">
        <v-icon color="light-blue" v-if="this.loop">mdi-repeat-once</v-icon>
        <v-icon color="blue-grey" v-else>mdi-repeat-once</v-icon>
      </v-btn>
      <v-btn text icon @click="toggleShuffle">
        <v-icon color="light-blue" v-if="this.shuffle">mdi-shuffle</v-icon>
        <v-icon color="blue-grey" v-else>mdi-shuffle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar text height="40">
      <v-progress-linear height="40" v-model="trackProgress"  @click="updateSeek($event)"></v-progress-linear> 
    </v-toolbar>
  </div>
</template>

<script>
  const {Howler} = require('howler');
export default {
  props: {
    loop: Boolean,
    shuffle: Boolean,
    progress: Number
    // progress: Number
  },
  data: () => ({
    volume: 0.5,
    muted: false
  }),
  computed: {
  trackProgress () {
    return this.progress * 100
    },
  },
  methods: {
    playTrack(index) {
      this.$emit('playtrack', index)
    },
    pauseTrack() {
      this.$emit('pausetrack')
    },
    stopTrack() {
      this.$emit('stoptrack')
    },
    skipTrack (direction) {
      this.$emit('skiptrack', direction)
    },
    updateVolume (volume) {
      Howler.volume(volume)
    },
    toggleMute () {
      Howler.mute(!this.muted)
      this.muted = !this.muted
    },
    toggleLoop () {
      this.$emit('toggleloop', !this.loop)
    },
    toggleShuffle () {
      this.$emit('toggleshuffle', !this.shuffle)
    },
    updateSeek (event) {
      let el = document.querySelector(".progress-linear__bar"),
        mousePos = event.offsetX,
        elWidth = el.clientWidth,
        percents = (mousePos / elWidth) * 100
      this.$emit('updateseek', percents)
    }
  }
}
</script>