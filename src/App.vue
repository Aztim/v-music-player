<template>
  <v-app>
    <v-content>
      <PlayerTitleBar/>
      <PlayerPlaylistPanel/>
    </v-content>
  </v-app>
</template>

<script>
import PlayerTitleBar from './components/PlayerTitleBar.vue'
import PlayerPlaylistPanel from './components/PlayerPlaylistPanel.vue'

export default {
  name: 'App',

  components: {
   PlayerTitleBar,
   PlayerPlaylistPanel,
  },

  data: () => ({
      playlist: [
        {title: "Star Wars (Main _Theme).mp3", artist: "Jhon Williams", howl: null, display: true},
        {title: "Star Wars (The Imperial March).mp3", artist: "Jhon Williams", howl: null, display: true},
        {title: "Simpsons", artist: "Simpsons", howl: null, display: true}
      ],
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

