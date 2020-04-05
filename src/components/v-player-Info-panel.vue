<template>
  <v-card height="60">
    <v-card-title>
      <h2>{{ trackInfo.artist }} - {{ trackInfo.title }}</h2>
      <v-spacer></v-spacer>
      <h3>{{trackInfo.seek | minutes}}/{{trackInfo.duration | minutes}}</h3>
    </v-card-title>
  </v-card>
</template>
 
<script>
  export default {
    props: {
      trackInfo: Object
    },
    filters: {
      minutes: (value) => {
        if (!value || typeof value !== "number") return "00:00"
        let min = parseInt(value / 60),
            sec = parseInt(value % 60)
        min = min < 10 ? "0" + min : min
        sec = sec < 10 ? "0" + sec : sec
        value = min + ":" + sec
        return value
      }
    }
  }
</script>