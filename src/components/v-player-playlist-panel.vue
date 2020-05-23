<template>
  <v-card height="330" :class="{playlist}">
    <v-list>
      <v-list-item
        v-for="(track, index) in playlist"
        :key="track.title"
        v-show="track.display"
        :class="[{selected: track === selectedTrack}, {even: index % 2 == 0}]">
        <v-list-item-content @click="selectTrack(track)" @dblclick="playTrack()">
          <v-list-item-title>{{ index | numbers }} {{ track.artist }} - {{ track.title }}</v-list-item-title>
        </v-list-item-content>
        <v-spacer></v-spacer>
        {{ track.howl.duration() | minutes }}
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    playlist: {
      type: Array,
      default () {
        return []
      }
    },
    selectedTrack: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    selectTrack (track) {
      this.$emit('selectTrack', track)
    },
    playTrack () {
      this.$emit('playtrack')
    }
  }
}
</script>

<style scoped>
  .selected {
    background-color: orange !important;
  }
  .even {
    background-color: #DCDCDC
  }
  .playlist {
    overflow: auto
  }
</style>
