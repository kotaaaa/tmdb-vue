<template>
  <div id="moreItemField">
    <span> Category </span>
    <!-- <router-link to="/home"> Home </router-link> -->
    <!-- <router-link to="/about"> About </router-link> -->
    <router-view></router-view>
    <ul>
      <li v-for="cat in genres" :key="cat.id">
        <div
          :id="cat.id"
          block="genre"
          :class="{ select: handleSelected(cat.id) }"
          @click="handleClick"
        >
          {{ cat.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import genres from "../mapping/genres_const"
export default {
  name: "Genre",
  components: {},
  props: {},
  data() {
    return genres;
  },
  computed() {},
  created() {},
  mounted() {},
  methods: {
    handleSelected(id) {
      return this.$store.getters.getParams.with_genres.indexOf(id) > -1 ? true : false;
    },
    handleClick(event) {
      const genres = this.$store.getters.getParams.with_genres.split(',');
      if (genres.indexOf(event.target.id) > -1) {
        this.$store
          .dispatch("deleteCategoryParam",event.target.id)
          .then(() => {
            this.$store
              .dispatch("search")
              .then(() => {})
              .catch(() => {});
          })
      } else {
        const params = this.$store.getters.getParams;
        if (params.with_genres == "") {
          params.with_genres = event.target.id;
        } else {
          params.with_genres = params.with_genres + "," + event.target.id;
        }
        
        this.$store
          .dispatch("search", params)
          .then(() => {
            this.$store
              .dispatch("updateParams", params)
              .then(() => {})
              .catch(() => {});
          })
          .catch(() => {});

      }
    },
  },
};
</script>

<style>
#moreItemField ul {
  list-style: none;
  padding-left: 0;
  /* width: 300px; */
}
#moreItemField li div {
  display: block;
  padding: 5px;
  text-decoration: none;
  color: #666 !important;
  cursor: pointer;
}

#moreItemField li div.select {
  background: #f2f2f2;
  padding-left: 5px;
}
</style>
