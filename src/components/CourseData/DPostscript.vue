<template>
  <span
    v-if="postscript"
    style="color: #929292"
    class="text-caption text-truncate"
  >
    {{ postscript }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DPostsctipt',
  props: {
    postscript: {
      type: String,
      default: undefined,
    },
  },

});
</script>
