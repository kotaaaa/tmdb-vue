<template>
  <body>
    <div class="movie-contents">
      <Movies class="movie-list"></Movies>
    </div>
  </body>
</template>


<script>
import Movies from "../components/Movies.vue";

export default {
  name: "Top",
  components: {
    Movies,
  },
};
</script>