<template>
  <v-app>
    <v-content>
      <v-container> 
        <PlayerTitleBar/>
        <PlayerControlsBars
          @playtrack="play"
          @pausetrack="pause"
          @stoptrack="stop"
          @skiptrack="skip"
        />
        <PlayerPlaylistPanel
          :playlist="playlist"
          :selectedTrack="selectedTrack"
          @selecttrack="selectTrack"
          @playtrack="play"
        /> 
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PlayerTitleBar from './components/PlayerTitleBar.vue'
import PlayerPlaylistPanel from './components/PlayerPlaylistPanel.vue'
import PlayerControlsBars from './components/PlayerControlsBars.vue'
const {Howl} = require('howler');

export default {
  name: 'Player',

  components: {
   PlayerTitleBar,
   PlayerPlaylistPanel,
   PlayerControlsBars
   
  },

  data: () => ({
      playlist: [
        {title: "Star Wars (Main Theme)", artist: "Jhon Williams", howl: null, display: true},
        {title: "Star Wars (The Imperial March)", artist: "Jhon Williams", howl: null, display: true},
        {title: "Simpsons", artist: "Simpsons", howl: null, display: true},
        {title: "Stayin Alive", artist: "Bee Gees", howl: null, display: true}
      ],
      selectedTrack: null,
      index: 0,
      playing: false
  }),
  computed: {
    currentTrack () {
      return this.playlist[this.index]
    },
  },
  created: function () {
      this.playlist.forEach( (track) => {
        let file = track.title.replace(/\s/g, "_")
        track.howl = new Howl({
        src: [`./playlist/${file}.mp3`]
      })
    }),
     this.$vuetify.theme.dark = true
  },
  methods: {
    selectTrack (track) {
      this.selectedTrack = track
    },
    play (index) {
      let selectedTrackIndex = this.playlist.findIndex(track => track === this.selectedTrack)
    
      if (typeof index === 'number') {
          // index = index
          
          index
      } 
      else if (this.selectedTrack) {
        if (this.selectedTrack != this.currentTrack) {
            this.stop()
          }
          index = selectedTrackIndex
        } else {
          index = this.index
      }
      let track = this.playlist[index].howl
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

      if (direction === "next") {
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
    }
  }
};
</script>

