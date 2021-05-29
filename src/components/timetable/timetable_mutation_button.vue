<template>
  <span>
    <v-btn
      v-if="isInclude"
      icon
      small
      color="#CFD8DC"
      @click.stop="removeCourse"
    >
      <v-icon> mdi-folder </v-icon>
    </v-btn>

    <v-btn
      v-else
      icon
      small
      color="#CFD8DC"
      @click.stop="addCourse"
    >
      <v-icon> mdi-folder-outline</v-icon>
    </v-btn>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import localStorage from '@/api/local_storage';
import request from '@/api/request';
import { CourseInfo } from '@/assets/CourseInfo';

export default defineComponent({
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
  setup: (props, context) => {
    const isInclude = computed((): boolean => {
      const { courses } = context.root.$store.state.timetable;

      return courses.some((course: CourseInfo) => `{"title":"${course.title?.name?.jp}","teacher":"${course.lecturers?.[0]?.name?.jp}"}` === `{"title":"${props.title}","teacher":"${props.teacher}"}`);
    });

    const removeCourse = () => {
      context.root.$store.commit('timetable/removeCourse', { title: props.title, teacher: props.teacher });

      localStorage.removeFromLocalStrage({ title: props.title, teacher: props.teacher });
    };

    const addCourse = () => {
      request.fetchAndStoreCourseForTimetable(`search?query=${props.title}&teacher=${props.teacher}`);

      localStorage.addToLocalStrage({ title: props.title, teacher: props.teacher });
    };

    return {
      isInclude,
      removeCourse,
      addCourse,
    };
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
