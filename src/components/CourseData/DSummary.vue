<template>
  <div
    v-if="courseDatas[idx].summary && courseDatas[idx].summary[`${curLang}`]"
    class="summary text-body-1"
  >
    <p>{{ courseDatas[idx].summary[`${curLang}`] }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DSummary',
  props: { idx: Number },

  computed: {
    courseDatas(): CourseInfo[] {
      return this.$store.state.courseDatas;
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
