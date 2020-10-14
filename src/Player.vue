<template>
  <div class="container">
    <div class="glow">
      <div class="text-container">
        <img src="favicon.ico" alt="">
          <!-- <br> -->
          <span class="text">Vue Music Player</span>
          <!-- <PlayerInfoPanel
          :trackInfo="getTrackInfo"
          /> -->
          <br>
          <div class="playback_controls">
            <button onclick="skip('back')"><i class="fa fa-fast-backward"></i></button>
            <button onclick="playpause()"><i class="fa fa-pause"></i></button>
            <button onclick="playpause()"><i class="fa fa-play"></i></button>
            <button onclick="stop()"><i class="fa fa-stop"></i></button>
            <button onclick="skip('fwd')"><i class="fa fa-fast-forward"></i></button>
          </div>
          <br>
          <div id="seekbar">
            <input type="range" oninput="setPos(this.value)" id="seek" value="0" max="">
            <PlayerInfoPanel
              :trackInfo="getTrackInfo"
            />
          </div>
          <br>
          <div class="volume_controls">
            <button id="mute" onclick="mute()"><i class="fa fa-volume-up"></i></button>
            <input type="range" id="volume" oninput="setVolume(this.value)" min="0" max="1" step="0.01" value="1">
          </div>
          <PlayerPlaylistPanel
          :playlist="playlist"
          :selectedTrack="selectedTrack"
          @selectTrack="select"
          @playtrack="play"
        />
      </div>
    </div>
  </div>
  <!-- <v-app>
    <v-content>
      <v-container>
        <PlayerTitleBar/>
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
        <PlayerPlaylistPanel
          :playlist="playlist"
          :selectedTrack="selectedTrack"
          @selectTrack="select"
          @playtrack="play"
        />
        <PlayerSearchBar
          :playlist="playlist"
        />
      </v-container>
    </v-content>
  </v-app> -->
</template>

<script>
// import PlayerTitleBar from './components/v-player-title-bar'
import PlayerPlaylistPanel from './components/v-player-playlist-panel'
// import PlayerControlsBars from './components/v-player-controls-bars'
import PlayerInfoPanel from './components/v-player-info-panel'
// import PlayerSearchBar from './components/v-player-search-bar'
import './assets/css/app.css'

import { Howl } from 'howler'
export default {
  name: 'App',

  components: {
    // PlayerTitleBar,
    PlayerPlaylistPanel,
    // PlayerControlsBars,
    PlayerInfoPanel
    // PlayerSearchBar
  },

  data: () => ({
    playlist: [
      { title: 'Star Wars(Main Theme)', artist: 'Jhon Williams', howl: null, display: true },
      { title: 'Star Wars(The Imperial March)', artist: 'Jhon Williams', howl: null, display: true },
      { title: 'Simpsons', artist: 'Simpsons', howl: null, display: true },
      { title: 'Stayin Alive', artist: 'Bee Gees', howl: null, display: true },
      { title: 'The Race', artist: 'Yello', howl: null, display: true },
      { title: 'Ghostbusters (Ost Ghostbusters)', artist: 'Ray Parker Jr.', howl: null, display: true },
      { title: 'The Godfather', artist: 'Nino Rota', howl: null, display: true }
    ],
    selectedTrack: null,
    index: 0,
    playing: false,
    loop: false,
    shuffle: false,
    seek: 0
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
      const artist = this.currentTrack.artist
      const title = this.currentTrack.title
      const seek = this.seek
      const duration = this.currentTrack.howl.duration()
      return {
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
