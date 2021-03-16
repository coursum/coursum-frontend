<template>
  <div
    id="search"
    :style="searchBarWidth"
    class="mx-auto"
  >
    <v-combobox
      :filled="true"
      :dense="true"
      rounded
      class="rounded-lg"
      prepend-inner-icon="mdi-magnify"
      type="text"
      hide-details
      :search-input.sync="input"
      :value="input"
      @keydown.enter="goResult"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import tool from '@/api/build_query';
import request from '@/api/request';

export default Vue.extend({

  name: 'SearchInput',

  data() {
    return {
      input: '',
    };
  },
  computed: {
    searchBarWidth(): object {
      let widthRate;
      const { breakpoint } = this.$vuetify;

      if (breakpoint.xs) {
        widthRate = 80;
      } else if (breakpoint.mdAndDown) {
        widthRate = 60;
      } else {
        widthRate = 40;
      }

      return { width: `${widthRate}%` };
    },
    flat(): boolean {
      return this.$route.path !== '/' && !this.$route.params.query;
    },
  },
  methods: {
    async goResult() {
      const searchQuery = tool.buildQuery({
        builder: this.input,
      });

      await request.fetchAndStoreCourses(searchQuery);

      this.$store.commit('setSearchInput', this.input);

      tool.goToResultPage(`/course/${searchQuery}`);
    },
  },
});
</script>

<style>
#search .v-text-field input {
  padding: 0px;
  line-height: 30px !important;
}

#search .v-icon {
  color: #bdbdbd;
}
</style>
