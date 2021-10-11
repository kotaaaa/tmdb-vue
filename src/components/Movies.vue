<template>
  <!-- <h1>{{ this.$store.getters.getSearchedMovies }}</h1> -->
  <h1 v-if="!$store.getters.getSearchedMovies.length">
    <p>No movie selected</p>
  </h1>
  <h1 v-if="$store.getters.getSearchedMovies.length">
    <p>Found {{ $store.getters.getSearchedMovies.length }} Movies !!</p>
  </h1>
  <div class="tbl-list-movie">
    <div
      v-for="movie in $store.getters.getSearchedMovies"
      :key="movie.id"
      class="unit-movie"
    >
      <a
        :href="
          'https://api.themoviedb.org/3/movie/' +
          movie.id +
          '?api_key=0534930d6692ebb101db3214a44bcfe7'
        "
      >
        <img
          :src="
            'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
            movie.poster_path
          "
        />
      </a>
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
