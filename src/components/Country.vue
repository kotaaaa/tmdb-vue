<template>
  <div id="moreItemField">
    <span> Country </span>
    <ul>
      <li v-for="country in countries" :key="country.iso_3166_1">
        <div
          :id="country.iso_3166_1"
          block="country"
          :class="{ select: handleSelected(country.iso_3166_1) }"
          @click="handleClick"
        >
          {{ country.english_name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import countries from "../mapping/countryConst";
export default {
  name: "Country",
  components: {},
  props: {},
  data() {
    return countries;
  },
  computed() {},
  created() {},
  mounted() {},
  methods: {
    handleSelected(id) {
      return this.$store.getters.getParams.region == id ? true : false;
    },
    handleClick(event) {
      if (this.$store.getters.getParams.region == event.target.id) {
        this.$store.dispatch("deleteParams", "region").then(() => {
          console.log("Deleting params succeeded");
          this.$store
            .dispatch("search")
            .then(() => {})
            .catch(() => {});
        });
      } else {
        const params = {};
        params.region = event.target.id;
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
