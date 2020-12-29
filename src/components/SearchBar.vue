<template>
  <div
    id="search"
    class="mx-auto"
  >
    <v-combobox
      v-model="model"
      :search-input.sync="searchWord"
      solo
      prepend-inner-icon="mdi-magnify"
      type="text"
      hide-details
      :placeholder="$t('placeholder')"
      @keydown.enter="goResultPage"
    >
      <template v-slot:no-data>
        <category-list />
      </template>
    </v-combobox>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CategoryList from '@/components/SideBar/CategoryList.vue';

export default Vue.extend({
  name: 'SearchBar',
  components: {
    CategoryList,
  },
  data() {
    return {
      searchWord: '',
      model: '',
    };
  },

  methods: {
    goResultPage() {
      let pushPath;

      if (this.searchWord === '') {
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
    "placeholder": "what do you learn?"
  },
  "jp": {
    "placeholder": "何を学びますか？"
  }
}
</i18n>
