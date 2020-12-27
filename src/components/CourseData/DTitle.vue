<template>
  <span
    v-if="title"
    class="font-weight-black text-truncate primary--text"
  >
    {{ title }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DTitle',
  props: {
    title: { type: String, default: undefined },
  },
});
</script>

<style scoped>
span {
  font-size: 14px;
}
</style>
