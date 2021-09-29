<template>
  <!-- <h1>{{ this.$store.getters.getSearchedMovies }}</h1> -->
  <div class="tbl-list-movie">
    <div
      v-for="movie in $store.getters.getSearchedMovies"
      :key="movie.id"
      class="unit-movie"
    >
      <img
        :src="
          'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path
        "
      />
    </div>
  </div>
</template>


<script>
export default {
  name: "Movies",
  props: {},
};
</script>
<style>
.tbl-list-movie {
  display: flex;
  flex-wrap: wrap;
}
.unit-movie {
  padding: 10px;
}
</style>
