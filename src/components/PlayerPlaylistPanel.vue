<template>
  <v-card height="330">
    <v-list>
      <v-list-item
        v-for="(track, index) in playlist"
        :key="track.title"
        v-show="track.display">
        <v-list-item-content>
          <v-list-item-title>{{ index | numbers }} {{ track.artist }} - {{ track.title }}</v-list-item-title>
        </v-list-item-content>
        <v-spacer></v-spacer>
        {{ track.howl.duration() }}
      </v-list-item>
    </v-list>
  </v-card>
</template>
 
<script> 
  export default {
    props: {
      playlist: [Array]
    },
    // props: ['playlist'],
    filters: {
      numbers: (value) => {
        let number = value + 1
        if (number < 10) {
          return "0" + number + "."
        } 
        return number + "."
      }
    }
  }
</script>