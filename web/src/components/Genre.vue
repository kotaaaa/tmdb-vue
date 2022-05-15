<template>
  <div id="moreItemField">
    <span
      v-bind:class="{ active: active === 'category' }"
      @click="dropdown('category')"
    >
      Category
    </span>
    <!-- <router-view></router-view> -->
    <ul v-if="active === 'category'">
      <li v-for="cat in genres.genres" :key="cat.id">
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
import genres from "../mapping/genresConst.js";
export default {
  name: "Genre",
  components: {},
  props: {},
  data() {
    const active = "";
    return { genres, active };
  },
  computed() {},
  created() {},
  mounted() {},
  methods: {
    dropdown(list) {
      console.log(this.active);
      this.active = this.active === list ? "" : list;
    },
    handleSelected(id) {
      return this.$store.getters.getParams.with_genres.indexOf(id) > -1
        ? true
        : false;
    },
    handleClick(event) {
      const genres = this.$store.getters.getParams.with_genres.split(",");
      if (genres.indexOf(event.target.id) > -1) {
        this.$store
          .dispatch("deleteCategoryParam", event.target.id)
          .then(() => {
            this.$store
              .dispatch("search")
              .then(() => {})
              .catch(() => {});
          });
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
</style>
