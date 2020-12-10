<template>
  <div v-if="lecturers">
    <span
      v-for="(lecturer, i) in lecturers"
      :key="i"
    >
      <span v-if="lecturer.name && lecturer.name[`${curLang}`]">
        {{ lecturer.name[`${curLang}`] }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Lecturer } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DLectures',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    lecturers(): Lecturer[] {
      return this.$store.state.courseDatas[this.idx].lecturers;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>
