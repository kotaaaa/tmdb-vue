<template>
  <div id="moreItemField">
    <span
      v-bind:class="{ active: active === 'country' }"
      @click="dropdown('country')"
    >
      Country
    </span>
    <ul v-if="active === 'country'">
      <li v-for="country in countries.countries" :key="country.iso_3166_1">
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
    const active = "";
    return { countries, active };
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
