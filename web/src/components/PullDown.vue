<template>
  <div id="moreItemField">
    <span
      v-bind:class="{ active: active === 'order' }"
      @click="dropdown('order')"
    >
      並び順
    </span>
    <ul v-if="active === 'order'">
      <li>
        <div
          :class="{ select: handleSortSelected('popularity.desc') }"
          @click.prevent.stop="sort('popularity')"
        >
          人気順
        </div>
        <div
          :class="{ select: handleSortSelected('release_date.desc') }"
          @click.prevent.stop="sort('release_date')"
        >
          リリース日順
        </div>
        <div
          :class="{ select: handleSortSelected('revenue.desc') }"
          @click.prevent.stop="sort('revenue')"
        >
          収益順
        </div>
        <div
          :class="{
            select: handleSortSelected('primary_release_date.desc'),
          }"
          @click.prevent.stop="sort('primary_release_date')"
        >
          主要リリース日順
        </div>
        <div
          :class="{
            select: handleSortSelected('original_title.desc'),
          }"
          @click.prevent.stop="sort('original_title')"
        >
          オリジナルタイトル順
        </div>
        <div
          :class="{ select: handleSortSelected('vote_average.desc') }"
          @click.prevent.stop="sort('vote_average')"
        >
          レビュー評価順
        </div>
        <div
          :class="{ select: handleSortSelected('vote_count.desc') }"
          @click.prevent.stop="sort('vote_count')"
        >
          レビュー数順
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    const listlabel = ["Mens", "Womens", "Kids"];
    const sublistlabel = ["Cloth", "Pants", "Shoes", "Goods"];
    const active = "";
    return { listlabel, sublistlabel, active };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    dropdown(list) {
      console.log(this.active);
      this.active = this.active === list ? "" : list;
    },
    handleSortSelected(id) {
      return this.$store.getters.getParams.sort_by == id ? true : false;
    },
    sort(value) {
      console.log(value);
      const params = {};
      switch (value) {
        case "popularity":
          params.sort_by = "popularity.desc";
          break;
        case "release_date":
          params.sort_by = "release_date.desc";
          break;
        case "revenue":
          params.sort_by = "revenue.desc";
          break;
        case "primary_release_date":
          params.sort_by = "primary_release_date.desc";
          break;
        case "original_title":
          params.sort_by = "original_title.desc";
          break;
        case "vote_average":
          params.sort_by = "vote_average.desc";
          break;
        case "vote_count":
          params.sort_by = "vote_count.desc";
          break;
      }
      console.log("params1", params);
      this.$store
        .dispatch("search", params)
        .then(() => {
          this.$store
            .dispatch("updateParams", params)
            .then(() => {
              console.log("succeed data update");
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
  },
};
</script>


<style>
</style>