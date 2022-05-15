<template>
  <!-- <h1>{{ this.$store.getters.getSearchedMovies }}</h1> -->
  <div>
    <div class="top-text">
      <h4 v-if="!$store.getters.getSearchedMovies.length">
        <p>No movie selected</p>
      </h4>
      <h4 v-if="$store.getters.getSearchedMovies.length">
        <p>Found {{ $store.getters.getSearchedMovies.length }} Movies</p>
      </h4>
    </div>
    <div class="tbl-list-movie">
      <div
        v-for="movie in $store.getters.getSearchedMovies"
        :key="movie.id"
        class="unit-movie"
      >
        <router-link :to="{ name: 'Work', params: { id: movie.id } }">
          <img
            :src="
              'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
              movie.poster_path
            "
          />
        </router-link>
        <p class="title">{{ movie.original_title }}</p>
        <span>Review: {{ movie.vote_average }} </span>
        <span> Review Count: {{ movie.vote_count }}</span>
        <p>Release Date: {{ movie.release_date }}</p>
      </div>
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
    };
  },
  created() {
    this.$store.dispatch("search");
  },
};
</script>
<style>
.top-text {
  /* position: relative; */
  top: 5px;
  /* left: 500px; */
}
.tbl-list-movie {
  display: flex;
  flex-wrap: wrap;
  /* position: static; */
  /* top: 100px; */
  /* left: 450px; */
}
.unit-movie {
  padding: 10px;
  text-align: center;
  max-width: 320px;
  /* font-size: 1.5rem; */
}
.title {
  font-size: 1.5rem;
}
</style>
