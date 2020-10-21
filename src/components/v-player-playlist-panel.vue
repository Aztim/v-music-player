<template>
  <div>
    <div
      class="toggle-list"
      :class="{'active': isActive}"
      @click="addActiveClass"
    >
      <i class="fas fa-angle-up"></i>
      <i class="fas fa-angle-down"></i>
    </div>
    <div class="list">
      <!-- Add this class {even: index % 2 == 0}  if you want zebra-style for list -->
      <div
        class="item"
        :class="{selected: track === selectedTrack}"
        v-for="(track, index) in playlist"
        :key="index"
      >
        <div class="thumbnail">
          <img :src="track.src" />
        </div>
        <div class="details"
          @click="selectTrack(track)"
          @dblclick="playTrack()"
        >
          <h2>{{ track.title }}</h2>
          <p>{{ track.artist }} - {{ track.howl.duration() | minutes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    isActive: false,
  }
  ),
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
    },
    addActiveClass () {
      this.isActive = !this.isActive
      this.$emit('addActiveClass')
    },
  }
}
</script>

<style scoped>
  .selected {
    background-color: #800517 !important;
  }
  /* .even {
    background-color: #212F3D
  } */
</style>
