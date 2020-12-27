<template>
  <div
    v-if="category"
    style="color: #929292"
    class="text-truncate text-caption"
  >
    {{ category }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DCategory',
  props: {
    category: { type: String, default: undefined },
  },

});
</script>
