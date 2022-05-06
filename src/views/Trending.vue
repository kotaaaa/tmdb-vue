<template>
  <body>
    <div class="trending-filters">
      <div id="moreItemField" class="type-filter">
        <span
          v-bind:class="{ active: active === 'type' }"
          @click="dropdown('type')"
        >
          Type
        </span>
        <ul v-if="active === 'type'">
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
      <div id="moreItemField" class="unit-filter">
        <span
          v-bind:class="{ active: active === 'unit' }"
          @click="dropdown('unit')"
        >
          Day/Week
        </span>
        <ul v-if="active === 'unit'">
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
    const active = "";
    return { types, units, active };
  },
  created() {
    this.$store.dispatch("getTrending");
  },
  methods: {
    dropdown(list) {
      console.log(this.active);
      this.active = this.active === list ? "" : list;
    },
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
.type-filter {
  position: absolute;
  top: 75px;
  left: 300px;
  width: 130px;
  padding: 10px;
}
.unit-filter {
  position: absolute;
  top: 75px;
  left: 450px;
  width: 130px;
  padding: 10px;
}
</style>