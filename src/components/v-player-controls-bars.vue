<template>
  <div>
    <div class="volume_controls">
      <button id="mute"  @click="toggleMute">
        <div v-if="!this.muted">
          <i v-if="this.volume >= 0.5" class="fa fa-volume-up"></i>
          <i v-else-if="this.volume > 0" class="fa fa-volume-down"></i>
          <i v-else class="fa fa-volume-off"></i>
        </div>
        <i v-show="this.muted" class="fa fa-volume-mute"></i>
      </button>
      <input type="range" id="volume" v-model="volume" @input="updateVolume(volume)" max="1" step="0.1">
      {{ this.volume * 100 + '%' }}
    </div>

    <div class="controls">
      <button @click="skipTrack('prev')"><i class="fa fa-fast-backward"></i></button>
      <button @click="pauseTrack"><i class="fa fa-pause"></i></button>
      <button @click="playTrack()"><i class="fa fa-play"></i></button>
      <button @click="stopTrack"><i class="fa fa-stop"></i></button>
      <button @click="skipTrack('next')"><i class="fa fa-fast-forward"></i></button>
    </div>
    <div class="seekbar">
      <input type="range" :value="trackProgress" @click="updateSeek($event)" id="seek">
    </div>
  </div>
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
    // toggleLoop () {
    //   this.$emit('toggleloop', !this.loop)
    // },
    // toggleShuffle () {
    //   this.$emit('toggleshuffle', !this.shuffle)
    // },
    updateSeek (event) {
      const el = document.querySelector('#seek')
      const mousePos = event.offsetX
      const elWidth = el.clientWidth
      const percents = (mousePos / elWidth) * 100
      this.$emit('updateseek', percents)
    }
  }
}
</script>
