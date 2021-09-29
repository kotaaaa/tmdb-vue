<template>
  <body>
    <div class="movie-contents">
      <!-- <Country class="category"></Country> -->
      <Genre class="Genre"></Genre>
      <Movies class="movie-list"></Movies>
    </div>
  </body>
</template>

<script>
// import Country from './components/Country.vue';
import Genre from "./components/Genre.vue";
import Movies from "./components/Movies.vue";

export default {
  name: "App",
  components: {
    Genre,
    Movies,
    // Country,
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
.genre {
  max-width: 15%;
}
.category {
  /* width: 300px; */
  max-width: 15%;
}
.movie-list {
  max-width: 85%;
}
</style>
