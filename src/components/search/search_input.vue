<template>
  <div
    id="search"
    :style="searchBarWidth"
    class="mx-auto"
  >
    <v-combobox
      :flat="flat"
      :solo="!flat"
      :filled="flat"
      :dense="flat"
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

export default Vue.extend({
  name: 'SearchInput',
  data() {
    return {
      input: (() => {
        const { query } = this.$route.params;
        if (!query) {
          return null;
        }

        return query?.split('&')?.find((queryParam) => queryParam.startsWith('query='))?.split('=')[1];
      })(),
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
  created() {
    this.input = this.$store.state.searchInput;
  },
  methods: {
    goResult() {
      const searchQuery = tool.buildQuery({
        builder: this.input,
      });

      this.$store.commit('setSearchInput', this.input);

      tool.goToResultPage(searchQuery);
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
