<template>
  <span v-if="credit">
    {{ credit }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DCredit',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    credit(): number | null | undefined {
      return this.$store.state.courseDatas[this.idx].credit;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>
