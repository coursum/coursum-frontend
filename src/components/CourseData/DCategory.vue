<template>
  <div
    v-if="
      courseDatas[idx].category && courseDatas[idx].category[`${curLang}`]
    "
    style="color: #929292"
    class="text-truncate text-caption"
  >
    {{ courseDatas[idx].category[`${curLang}`] }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DCategory',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

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
