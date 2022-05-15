<template>
  <div class="detail-page">
    <div class="movie-detail">
      <!-- {{ $route.params.id }} -->
      <div class="detail-image">
        <img
          :src="
            'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
            this.$store.getters.getDetail.poster_path
          "
        />
      </div>
      <div class="detail-text">
        <h1 class="title">
          {{ this.$store.getters.getDetail.original_title }}
        </h1>
        <span>Review: {{ this.$store.getters.getDetail.vote_average }} </span>
        <span>
          Review Count: {{ this.$store.getters.getDetail.vote_count }}</span
        >
        <p>Release Date: {{ this.$store.getters.getDetail.release_date }}</p>
        <h4>Overview</h4>
        <!-- <br /> -->
        <p>{{ this.$store.getters.getDetail.overview }}</p>
      </div>
    </div>
    <div class="original-review">
      <h4>Original Review</h4>
      <span
        v-for="review in this.$store.getters.getOriginalReviews"
        :key="review.id"
      >
        <h4>
          Username: {{ review.username }} Rating:
          {{ review.rating }}
        </h4>
        {{ review.content }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      detail: this.$store.getters.getDetail,
    };
  },
  // components: {

  // }
  // computed() {
  created() {
    console.log("this.$route.params.id1", this.$route.params.id);
    this.$store.dispatch("getDetail", this.$route.params.id);
    this.$store.dispatch("getReview", this.$route.params.id);
    // this.$store.dispatch("getWordCloudStatus", this.$route.params.id);
  },
};
</script>

<style>
.movie-detail {
  display: flex;
  justify-content: space-between;
}

.detail-image {
  width: 40%;
}
.detail-text {
  width: 60%;
}
</style>