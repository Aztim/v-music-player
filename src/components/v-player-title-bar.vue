<template>
  <v-system-bar window>
    <!-- <v-menu offset-y transition="slide-y-transition"??????????>  -->
    <v-menu offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          text
          small
          right
          v-on="on">
          <v-icon>mdi-headset</v-icon>MENU
        </v-btn>
      </template>
      <v-list>
        <v-list-item  @click="dialog = true">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-dialog  max-width="300">
          <v-card v-model="dialog">
            <v-card-title><h2>Vue Music Player</h2></v-card-title>
            <v-card-text>Version 3.0.0</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    VUE MUSIC PLAYER
    <v-spacer></v-spacer>
    <v-icon>mdi-minus-circle-outline</v-icon>
    <v-icon>mdi-checkbox-blank-outline</v-icon>
    <v-icon>mdi-close-circle</v-icon>
  </v-system-bar>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  }
}
</script>
