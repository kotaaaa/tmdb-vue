<template>
  <body>
    <div class="movie-contents">
      <Genre class="genre-filter"></Genre>
      <Country class="country-filter"></Country>
      <Movies class="movie-list"></Movies>
    </div>
  </body>
</template>

<script>
import Country from './components/Country.vue';
import Genre from "./components/Genre.vue";
import Movies from "./components/Movies.vue";

export default {
  name: "App",
  components: {
    Genre,
    Movies,
    Country,
  },
};
</script>

<style>
.movie-contents {
  display: flex;
  justify-content: space-between;
  width: 1500px;
  /* padding: 0 4%; */
}
.genre-filter {
  position: absolute;
  top: 100px;
  left: 40px;
  max-width: 15%;
}
.country-filter {
  /* width: 300px; */
  position: absolute;
  top: 100px;
  left: 200px;
  max-width: 15%;
  max-width: 15%;
}
.movie-list {
  /* position: absolute;
  top: 100px;
  left: 200px; */
  max-width: 85%;
}
</style>
