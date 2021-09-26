<template>
  <div id="moreItemField">
    <div>
      <span>ジャンル</span>
    </div>
    <ul>
      <li>
        <div
          id="10749"
          block="genre"
          :class="{ select: handleSelected(10749) }"
          @click="handleClick"
        >
          Romance
        </div>
      </li>
      <li>
        <div
          id="28"
          block="genre"
          :class="{ select: handleSelected(28) }"
          @click="handleClick"
        >
          Action
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Genre",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
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
#moreItemField li div {
  display: block;
  padding: 12px 5px;
  text-decoration: none;
  color: #666 !important;
  cursor: pointer;
}

#moreItemField li div.select {
  background: #f2f2f2;
  padding-left: 5px;
}
</style>
