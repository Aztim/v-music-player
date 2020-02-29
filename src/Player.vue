<template>
  <v-app>
    <v-content>
      <v-container> 
        <PlayerTitleBar/>
        <!-- <PlayerPlaylistPanel> -->
        <PlayerPlaylistPanel
          :playlist="playlist"
          /> 
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PlayerTitleBar from './components/PlayerTitleBar.vue'
import PlayerPlaylistPanel from './components/PlayerPlaylistPanel.vue'
const {Howl} = require('howler');

export default {
  name: 'Player',

  components: {
   PlayerTitleBar,
   PlayerPlaylistPanel,
   
  },

  data: () => ({
      playlist: [
        {title: "Star Wars (Main Theme).mp3", artist: "Jhon Williams", howl: null, display: true},
        {title: "Star Wars (The Imperial March).mp3", artist: "Jhon Williams", howl: null, display: true},
        {title: "Simpsons", artist: "Simpsons", howl: null, display: true}
      ],
      selectedTrack: null
  }),
  created: function () {
      this.playlist.forEach( (track) => {
        let file = track.title.replace(/\s/g, "_")
        track.howl = new Howl({
        src: [`./playlist/${file}.mp3`]
      })
    })
  }
};
</script>

