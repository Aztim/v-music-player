<template>
  <div
    class="player"
    :class="{'activeSongList': isActiveSongList}"
  >
    <div class="main">
      <PlayerInfoPanel
        :trackInfo="getTrackInfo"
      />
      <PlayerControlsBars
        :loop="loop"
        :shuffle="shuffle"
        :progress="progress"
        @playtrack="play"
        @pausetrack="pause"
        @stoptrack="stop"
        @skiptrack="skip"
        @toggleloop="toggleLoop"
        @toggleshuffle="toggleShuffle"
        @updateseek="setSeek"
      />
    </div>
    <div class="player-list">
      <PlayerPlaylistPanel
        :playlist="playlist"
        :selectedTrack="selectedTrack"
        @selectTrack="select"
        @playtrack="play"
        @addActiveClass= "isActiveSongList = !isActiveSongList"
      />
    </div>
    <!-- <PlayerSearchBar
      :playlist="playlist"
    /> -->
  </div>
</template>

<script>
import PlayerPlaylistPanel from './components/v-player-playlist-panel'
import PlayerControlsBars from './components/v-player-controls-bars'
import PlayerInfoPanel from './components/v-player-info-panel'
// import PlayerSearchBar from './components/v-player-search-bar'
import './assets/css/app.css'

import { Howl } from 'howler'
export default {
  name: 'App',
  components: {
    PlayerPlaylistPanel,
    PlayerControlsBars,
    PlayerInfoPanel,
    // PlayerSearchBar
  },

  data: () => ({
    playlist: [
      { title: 'Star Wars(Main Theme)', artist: 'John Williams', howl: null, display: true,  src: require('@/assets/image/Star_Wars_1.jpg') },
      { title: 'Star Wars(The Imperial March)', artist: 'John Williams', howl: null, display: true, src: require('@/assets/image/Star_Wars_2.jpg') },
      { title: 'Simpsons', artist: 'Simpsons', howl: null, display: true, src: require('@/assets/image/Simpsons.jpg') },
      { title: 'Stayin Alive', artist: 'Bee Gees', howl: null, display: true, src: require('@/assets/image/BeeGees.jpg') },
      { title: 'You Can Leave Your Hat On', artist: 'Joe Cocker', howl: null, display: true, src: require('@/assets/image/Cocker.jpg') },
      { title: 'Ghostbusters (Ost Ghostbusters)', artist: 'Ray Parker Jr.', howl: null, display: true, src: require('@/assets/image/Ghost.jpg') },
      { title: 'The Godfather', artist: 'Nino Rota', howl: null, display: true, src: require('@/assets/image/GoodFather.jpg') }
    ],
    selectedTrack: null,
    index: 0,
    playing: false,
    loop: false,
    shuffle: false,
    seek: 0,
    isActiveSongList: false
  }),
  created: function () {
    this.playlist.forEach((track) => {
      const file = track.title.replace(/\s/g, '_')
      track.howl = new Howl({
        src: [`playlist/${file}.mp3`],
        onend: () => {
          if (this.loop) {
            this.play(this.index)
          } else {
            this.skip('next')
          }
        }
      })
    })
  },
  computed: {
    currentTrack () {
      return this.playlist[this.index]
    },
    progress () {
      if (this.currentTrack.howl.duration() === 0) return 0
      return this.seek / this.currentTrack.howl.duration()
    },
    getTrackInfo () {
      const image = this.currentTrack.src
      const artist = this.currentTrack.artist
      const title = this.currentTrack.title
      const seek = this.seek
      const duration = this.currentTrack.howl.duration()
      return {
        image,
        artist,
        title,
        seek,
        duration
      }
    }
  },
  watch: {
    playing (playing) {
      this.seek = this.currentTrack.howl.seek()
      let updateSeek
      if (playing) {
        updateSeek = setInterval(() => {
          this.seek = this.currentTrack.howl.seek()
        }, 250)
      } else {
        clearInterval(updateSeek)
      }
    }
  },
  methods: {
    select (track) {
      this.selectedTrack = track
    },
    play (index) {
      const selectedTrackIndex = this.playlist.findIndex(track => track === this.selectedTrack)
      if (typeof index === 'number') {
        // index = index
      } else if (this.selectedTrack) {
        if (this.selectedTrack !== this.currentTrack) {
          this.stop()
        }
        index = selectedTrackIndex
      } else {
        index = this.index
      }
      const track = this.playlist[index].howl
      if (track.playing()) {
        return
      } else {
        track.play()
      }
      this.selectedTrack = this.playlist[index]
      this.playing = true
      this.index = index
    },
    pause () {
      this.currentTrack.howl.pause()
      this.playing = false
    },
    stop () {
      this.currentTrack.howl.stop()
      this.playing = false
    },
    skip (direction) {
      let index = 0
      const lastIndex = this.playlist.length - 1
      if (this.shuffle) {
        index = Math.round(Math.random() * lastIndex)
        while (index === this.index) {
          index = Math.round(Math.random() * lastIndex)
        }
      } else if (direction === 'next') {
        index = this.index + 1
        if (index >= this.playlist.length) {
          index = 0
        }
      } else {
        index = this.index - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
      }
      this.skipTo(index)
    },
    skipTo (index) {
      if (this.currentTrack) {
        this.currentTrack.howl.stop()
      }
      this.play(index)
    },
    toggleLoop (value) {
      this.loop = value
    },
    toggleShuffle (value) {
      this.shuffle = value
    },
    setSeek (percents) {
      const track = this.currentTrack.howl
      if (track.playing()) {
        track.seek((track.duration() / 100) * percents)
      }
    }
  }
}
</script>

<style>
</style>
