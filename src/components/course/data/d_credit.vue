<template>
  <v-chip
    v-if="credit"
    style="color: #929292"
    outlined
    x-small
  >
    {{ credit }}{{ $t("credit") }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DCredit',
  props: {
    credit: {
      type: Number,
      default: undefined,
    },
  },
});
</script>

<i18n>
{
  "en": {
    "credit": "credit"
  },
  "jp": {
    "credit": "単位"
  }
}
</i18n>
