<template>
  <div>
    <div class="playback_controls">
      <button @click="skipTrack('prev')"><i class="fa fa-fast-backward"></i></button>
      <button @click="pauseTrack"><i class="fa fa-pause"></i></button>
      <button @click="playTrack()"><i class="fa fa-play"></i></button>
      <button @click="stopTrack"><i class="fa fa-stop"></i></button>
      <button @click="skipTrack('next')"><i class="fa fa-fast-forward"></i></button>
    </div>
    <div class="volume_controls">
      <button id="mute"  @click="toggleMute">
        <i v-if="this.muted" class="fa fa-volume-up"></i>
        <i v-else class="fa fa-volume-off"></i>
      </button>
      <input type="range" id="volume" v-model="volume" @input="updateVolume(volume)" max="1" step="0.1">
    </div>
    {{ this.volume * 100 + '%' }}
  </div>
    <!-- <v-toolbar text height=90>
      <v-btn text icon @click="toggleMute">
        <template v-if="!this.muted">
          <v-icon v-if="this.volume >= 0.5">mdi-volume-high</v-icon>
          <v-icon v-else-if="this.volume > 0">mdi-volume-medium</v-icon>
          <v-icon v-else>mdi-volume-variant-off</v-icon>
        </template>
        <v-icon v-show="this.muted">mdi-volume-off</v-icon>
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
      <v-progress-linear height="40" :value="trackProgress" @click="updateSeek($event)" class="progress-linear__bar"></v-progress-linear>
    </v-toolbar>
  </div> -->
</template>

<script>
import { Howler } from 'howler'
export default {
  props: {
    loop: Boolean,
    shuffle: Boolean,
    progress: Number
  },
  data () {
    return {
      volume: 0.5,
      muted: false
    }
  },
  computed: {
    trackProgress () {
      return this.progress * 100
    }
  },
  created: function () {
    Howler.volume(this.volume)
  },
  methods: {
    playTrack (index) {
      this.$emit('playtrack', index)
    },
    pauseTrack () {
      this.$emit('pausetrack')
    },
    stopTrack () {
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
      const el = document.querySelector('.progress-linear__bar')
      const mousePos = event.offsetX
      const elWidth = el.clientWidth
      const percents = (mousePos / elWidth) * 100
      this.$emit('updateseek', percents)
    }
  }
}
</script>
