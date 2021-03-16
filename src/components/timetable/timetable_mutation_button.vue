<template>
  <span>
    <v-btn
      v-if="isInclude"
      icon
      small
      color="#CFD8DC"
      @click.stop="removeCourse"
    >
      <v-icon> mdi-folder-heart </v-icon>
    </v-btn>

    <v-btn
      v-else
      icon
      small
      color="#CFD8DC"
      @click.stop="addCourse"
    >
      <v-icon> mdi-folder-heart-outline</v-icon>
    </v-btn>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';
import localStorage from '@/api/local_storage';
import request from '@/api/request';

export default Vue.extend({
  name: 'TimetableMutationButton',
  props: {
    title: {
      type: String,
      default: '',
    },
    teacher: {
      type: String,
      default: '',
    },
  },
  computed: {
    isInclude(): boolean {
      const { courses } = this.$store.state.timetable;

      return courses.some((course: CourseInfo) => `{"title":"${course.title?.name?.jp}","teacher":"${course.lecturers?.[0]?.name?.jp}"}` === `{"title":"${this.title}","teacher":"${this.teacher}"}`);
    },
  },
  methods: {
    removeCourse() {
      this.$store.commit('timetable/removeCourse', { title: this.title, teacher: this.teacher });

      localStorage.removeFromLocalStrage({ title: this.title, teacher: this.teacher });
    },
    addCourse() {
      request.fetchAndStoreCourseForTimetable(`search?query=${this.title}&teacher=${this.teacher}`);

      localStorage.addToLocalStrage({ title: this.title, teacher: this.teacher });
    },
  },

});
</script>

<i18n>
{
  "en": {
    "add": "add to time table",
    "remove": "remove from time table"
  },
  "jp": {
    "add": "時間割に追加",
    "remove": "時間割から外す"
  }
}
</i18n>
