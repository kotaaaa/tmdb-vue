<template>
  <h1>{{ this.$store.getters.getSearchedMovies }}</h1>
</template>


<script>
export default {
  name: 'SearchedMovies',
  props: {
  }
}
</script>
