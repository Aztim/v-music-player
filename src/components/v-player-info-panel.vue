<template>
  <div>
    <div>
      <h2>{{ trackInfo.artist }} - {{ trackInfo.title }}</h2>
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
