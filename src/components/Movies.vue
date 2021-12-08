<template>
  <!-- <h1>{{ this.$store.getters.getSearchedMovies }}</h1> -->
  <div class="top-text">
    <h1 v-if="!$store.getters.getSearchedMovies.length">
      <p>No movie selected</p>
    </h1>
    <h1 v-if="$store.getters.getSearchedMovies.length">
      <p>Found {{ $store.getters.getSearchedMovies.length }} Movies </p>
    </h1>
  </div>
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
          '?api_key='+ VUE_APP_IMDB_API_KEY
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
  data() {
    return {
      VUE_APP_IMDB_API_KEY: process.env.VUE_APP_IMDB_API_KEY,
    }
  }
};
</script>
<style>
.top-text {
  position: absolute;
  top: 25px;
  left: 400px;
}
.tbl-list-movie {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 100px;
  left: 200px;
}
.unit-movie {
  padding: 10px;
}
</style>
