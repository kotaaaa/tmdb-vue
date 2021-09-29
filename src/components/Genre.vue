<template>
  <div id="moreItemField">
    <ul>
      <li v-for="cat in genres" :key="cat.id">
        <div
          :id="cat.id"
          block="genre"
          :class="{ select: handleSelected(cat.id) }"
          @click="handleClick"
        >
          {{cat.name}}
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
      return this.$store.getters.getParams.with_genres == id ? true : false;
    },
    handleClick(event) {
      if (this.$store.getters.getParams.with_genres == event.target.id) {
        this.$store
          .dispatch("deleteParams","with_genres")
          .then(() => {
            console.log("Deleting params succeeded");
            this.$store
              .dispatch("search")
              .then(() => {})
              .catch(() => {});
          })
      } else {      
      const params = {};
      params.with_genres = event.target.id;
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
