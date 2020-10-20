<template>
  <div>
    <div class="thumbnail">
      <img :src="trackInfo.image">
    </div>
    <div class="details">
      <h2>{{ trackInfo.title }}</h2>
      <p>{{ trackInfo.artist }}</p>
      <h3>{{trackInfo.seek | minutes}}/{{trackInfo.duration | minutes}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trackInfo: Object
  }
}
</script>
