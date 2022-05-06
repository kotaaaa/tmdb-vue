<template>
  <body>
    <div class="movie-contents">
      <Genre class="genre-filter"></Genre>
      <Country class="country-filter"></Country>
      <PullDown class="item-pulldown"></PullDown>
      <Movies class="movie-list"></Movies>
    </div>
  </body>
</template>

<script>
import Country from "./Country.vue";
import Genre from "./Genre.vue";
import PullDown from "./PullDown.vue";
import Movies from "./Movies.vue";

export default {
  name: "List",
  components: {
    Genre,
    Movies,
    PullDown,
    Country,
  },
};
</script>

<style>
.genre-filter {
  position: absolute;
  top: 75px;
  left: 300px;
  /* max-width: 1000px; */
  width: 130px;
  padding: 10px;
}
.country-filter {
  position: absolute;
  top: 75px;
  left: 450px;
  width: 130px;
  padding: 10px;
}
.item-pulldown {
  position: absolute;
  top: 75px;
  left: 600px;
  width: 130px;
  padding: 10px;
}
</style>
