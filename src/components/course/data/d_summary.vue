<template>
  <div
    v-if="summaryData"
    :class="{summary: textTruncate}"
    class="px-6 primary--text py-1"
    :style="summaryStyle"
  >
    <p
      class="my-0"
    >
      {{ summaryData }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { basicTemplate } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DSummary',
  props: {
    summary: {
      type: Object,
      default: basicTemplate,
    },
    title: {
      type: Object,
      default: basicTemplate,
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      summaryStyle: { 'font-size': '1rem' },
    };
  },
  computed: {
    summaryData(): string | null | undefined {
      if (this.titleJp === '研究会Ａ' || this.titleJp === '研究会Ｂ') {
        return this.summary?.en;
      }

      return this.summary?.[this.curLang];
    },
    titleJp(): string | null | undefined {
      return this.title?.jp;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

.summary p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
