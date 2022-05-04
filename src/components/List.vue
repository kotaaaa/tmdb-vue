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
import Country from "./Country.vue";
import Genre from "./Genre.vue";
import Movies from "./Movies.vue";

export default {
  name: "List",
  components: {
    Genre,
    Movies,
    Country,
  },
};
</script>

<style>
.genre-filter {
  width: 200px;
  padding: 10px;
  /* position: absolute; */
  /* top: 100px; */
  /* left: 40px; */
  /* max-width: 1000px; */
}
.country-filter {
  width: 200px;
  padding: 10px;
  /* position: absolute; */
  /* top: 100px;  */
  /* left: 200px; */
  /* max-width: 1000px; */
  /* max-width: 15%; */
}
</style>
