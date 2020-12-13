<template>
  <div
    v-if="summary && summary[`${curLang}`]"
    class="summary text-body-1"
  >
    <p>
      {{ summary[`${curLang}`] }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Basic } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DSummary',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    summary(): Basic {
      return this.$store.state.courseDatas[this.idx].summary;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>

<style scoped>
.summary p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
