<template>
  <v-chip
    v-if="credit"
    color="caption"
    outlined
    x-small
  >
    {{ credit }}{{ $t("credit") }}
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
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
