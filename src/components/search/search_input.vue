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
      :value="model"
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
      model: '',
    };
  },
  computed: {
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
  methods: {
    goResult() {
      let pushPath;

      if (this.searchWord === null || this.searchWord === '') {
        pushPath = '/';
      } else {
        pushPath = `/search/${this.searchWord}`;
      }

      if (this.$route.path !== pushPath) {
        this.$router.push(pushPath);
      }

      this.model = this.searchWord;
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
