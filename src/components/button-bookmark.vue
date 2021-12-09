<template>
  <span>
    <v-btn v-if="isInclude"
           icon small color="#CFD8DC"
           @click.stop="removeCourse"
    >
      <v-icon>mdi-folder</v-icon>
    </v-btn>

    <v-btn v-else
           icon small color="#CFD8DC"
           @click.stop="addCourse"
    >
      <v-icon>mdi-folder-outline</v-icon>
    </v-btn>
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';
import type { CourseV2 } from 'coursum-types';

import injectStrict from '@/util/inject-strict';
import { setTimetableCoursesKey, timetableCoursesKey } from '@/util/injection-keys';

export default defineComponent({
  name: 'ButtonBookmark',
  props: {
    course: {
      type: Object as PropType<CourseV2>,
      required: true,
    },
  },
  setup: (props) => {
    const timetableCourses = injectStrict(timetableCoursesKey);
    const setTimetableCourses = injectStrict(setTimetableCoursesKey);

    const isCourseInTimetable = (course: CourseV2) => (
      timetableCourses.value.some(({ id }) => id === course.id)
    );

    const isInclude = computed(() => isCourseInTimetable(props.course));

    const removeCourse = () => {
      const courses = timetableCourses.value.filter(({ id }) => id !== props.course.id);

      setTimetableCourses(courses);
    };

    const addCourse = () => {
      if (isCourseInTimetable(props.course)) return;

      const courses = [...timetableCourses.value, props.course];
      setTimetableCourses(courses);
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
  "ja": {
    "add": "時間割に追加",
    "remove": "時間割から外す"
  }
}
</i18n>
