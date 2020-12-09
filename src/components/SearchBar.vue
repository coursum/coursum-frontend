<template>
  <div>
    <v-text-field
      v-model="searchWord"
      rounded
      filled
      height="40"
      hide-details
      type="text"
      @change="fetchData()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchBar',

  data() {
    return {
      searchWord: '',
    };
  },
  methods: {
    async fetchData() {
      console.log(this.searchWord);
      this.$store.commit('fetchData', `query=${this.searchWord}`);
    },
  },

});
</script>

<style>
.v-input__slot {
  min-height: auto !important;
}
</style>
