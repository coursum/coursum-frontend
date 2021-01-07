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
      :placeholder="$t('placeholder')"
      :search-input.sync="searchWord"
      :value="searchInput"
      @keydown.enter="goResult"
    >
      <template v-slot:no-data>
        <category-list />
      </template>
    </v-combobox>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CategoryList from '@/components/search/category_list.vue';

export default Vue.extend({
  name: 'SearchInput',
  components: {
    CategoryList,
  },
  data() {
    return {
      searchWord: '',
      searchInput: '',
    };
  },
  computed: {
    getSearchInput(): string {
      return this.$store.state.searchInput;
    },
    flat(): boolean {
      if (this.$route.path === '/' || this.$route.params.query) {
        return false;
      }
      return true;
    },
    langOpts() {
      return [this.$i18n.t('en'), this.$i18n.t('jp')];
    },
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
  },
  created() {
    this.setValue();
  },
  methods: {
    storeValue() {
      this.$store.commit('setSearchInput', this.searchInput);
    },
    setValue() {
      this.searchInput = this.getSearchInput;
    },
    hasNotQueryInRouterParams() {
      let pushPath;
      const checkSearchWord = this.searchWord !== undefined && this.searchWord !== null && this.searchWord !== '';

      if (checkSearchWord) {
        pushPath = `/search/query=${this.searchWord}`;
      } else {
        pushPath = '/';
      }
      this.pushPath(pushPath);
    },
    hasQueryInRouterParams() {
      let pushPath;
      let hasOptions;
      let options;

      let query = '';

      const attrs = this.$route.params.query.split('&');
      const pattern = /^query=/;

      [query] = attrs;

      const hasQuery = pattern.test(query);

      if (attrs.length > 1) {
        let opts;
        hasOptions = true;

        if (hasQuery) {
          [, ...opts] = attrs;
          options = opts.join('&');
        } else {
          [...opts] = attrs;
          options = opts.join('&');
        }
      } else if (hasQuery) {
        hasOptions = false;
      } else {
        hasOptions = true;
        [options] = attrs;
      }

      const checkSearchWord = this.searchWord !== undefined && this.searchWord !== null && this.searchWord !== '';

      if (hasOptions) {
        if (checkSearchWord) {
          pushPath = `/search/query=${this.searchWord}&${options}`;
        } else {
          pushPath = `/search/${options}`;
        }
      } else if (checkSearchWord) {
        pushPath = `/search/query=${this.searchWord}`;
      } else {
        pushPath = '/';
      }

      this.pushPath(pushPath);
    },
    pushPath(pushPath: string) {
      if (this.$route.path !== pushPath) {
        this.$router.push(pushPath);
      }
    },
    goResult() {
      if (this.$route.params.query) {
        this.hasQueryInRouterParams();
      } else {
        this.hasNotQueryInRouterParams();
      }

      this.searchInput = this.searchWord;

      this.storeValue();
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

<i18n>
{
  "en": {
    "placeholder": "what do you learn?",
    "lang": "language",
    "en": "english",
    "jp": "japanese"
  },
  "jp": {
    "placeholder": "何を学びますか？",
    "lang": "言語",
    "en": "英語",
    "jp": "日本語"
  }
}
</i18n>
