<template>
  <body>
    <div class="movie-contents">
      <div id="moreItemField">
        <span> Type </span>
        <ul>
          <li v-for="type in types.types" :key="type.type">
            <div
              :id="type.type"
              :class="{ select: handleSelectedType(type.type) }"
              @click="handleClickType"
            >
              {{ type.type }}
            </div>
          </li>
        </ul>
      </div>
      <div id="moreItemField">
        <span> Day/Week </span>
        <ul>
          <li v-for="unit in units.units" :key="unit.unit">
            <div
              :id="unit.unit"
              :class="{ select: handleSelectedUnit(unit.unit) }"
              @click="handleClickUnit"
            >
              {{ unit.unit }}
            </div>
          </li>
        </ul>
      </div>
      <Movies class="movie-list"></Movies>
    </div>
  </body>
</template>

<script>
import Movies from "../components/Movies.vue";
import types from "../mapping/typesConst.js";
import units from "../mapping/unitMapping.js";

export default {
  name: "Trending",
  components: {
    Movies,
  },
  data() {
    return { types, units };
  },
  created() {
    this.$store.dispatch("getTrending");
  },
  methods: {
    handleSelectedType(id) {
      return this.$store.getters.getTypes.type.indexOf(id) > -1 ? true : false;
    },
    handleSelectedUnit(id) {
      return this.$store.getters.getTypes.unit.indexOf(id) > -1 ? true : false;
    },
    handleClickType(event) {
      const types = {};
      types.type = event.target.id;
      this.$store.dispatch("updateType", types).then(() => {
        this.$store
          .dispatch("getTrending")
          .then(() => {})
          .catch(() => {});
      });
    },
    handleClickUnit(event) {
      const types = {};
      types.unit = event.target.id;
      this.$store.dispatch("updateType", types).then(() => {
        this.$store
          .dispatch("getTrending")
          .then(() => {})
          .catch(() => {});
      });
    },
  },
};
</script>


<style>
</style>