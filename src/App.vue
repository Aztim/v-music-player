<template>
  <v-app>
    <v-content>
      <Player />
    </v-content>
  </v-app>
</template>

<script>
import Player from './components/Player';

export default {
  name: 'App',

  components: {
    Player
  },

  data: () => ({
    //
  }),
};
</script>
