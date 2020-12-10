<template>
  <div
    v-if="category && category[`${curLang}`]"
    style="color: #929292"
    class="text-truncate text-caption"
  >
    {{ category[`${curLang}`] }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Basic } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DCategory',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    category(): Basic {
      return this.$store.state.courseDatas[this.idx].category;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>
