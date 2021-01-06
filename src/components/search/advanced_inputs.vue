<template>
  <span>
    <v-checkbox
      v-model="isGiga"
      hide-details
      label="GIGA"
      value="GIGA: true"
    />
    <!-- @click="goResultPage" -->
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchInput',
  data() {
    return {
      isGiga: '',
    };
  },

});
</script>
