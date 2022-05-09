<template>
  <div class="movie-detail">
    <!-- {{ $route.params.id }} -->
    <img
      :src="
        'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
        this.$store.getters.getDetail.poster_path
      "
    />
    <p class="title">{{ this.$store.getters.getDetail.original_title }}</p>
    <span>Review: {{ this.$store.getters.getDetail.vote_average }} </span>
    <span> Review Count: {{ this.$store.getters.getDetail.vote_count }}</span>
    <p>Release Date: {{ this.$store.getters.getDetail.release_date }}</p>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      detail: this.$store.getters.getDetail,
    };
  },
  // components: {

  // }
  // computed() {
  created() {
    console.log("this.$route.params.id1", this.$route.params.id);
    this.$store.dispatch("getDetail", this.$route.params.id);
  },
};
</script>

<style>
</style>