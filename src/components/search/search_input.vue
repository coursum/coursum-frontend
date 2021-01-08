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
    >
      <!-- <template v-slot:no-data>
        <category-list />
      </template> -->
    </v-combobox>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// TODO: implement CategoryList
// import CategoryList from '@/components/search/category_list.vue';

export default Vue.extend({
  name: 'SearchInput',
  components: {
    // CategoryList,
  },
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
      const { breakpoint }: any = this.$vuetify;

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
      this.input = this.input ?? '';
      if (this.input === '') return;

      let search = this.$route.params.query ?? '';
      this.input = this.input ?? '';

      if (!search) {
        const queryParamCount = search.split('&').length;

        if (queryParamCount === 1) {
          search = `query=${this.input}`;
        } else {
          search = search.replace(/^query=(.*?)&/, `query=${this.input ?? ''}&`);
        }
      } else {
        search = `query=${this.input}`;
      }

      const pushPath = `/search/${search}`;

      if (pushPath !== this.$route.path) {
        this.$router.push(pushPath);
      }

      this.$store.commit('setSearchInput', this.input);
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
