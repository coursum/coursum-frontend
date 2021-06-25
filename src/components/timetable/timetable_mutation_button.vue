<template>
  <span>
    <v-btn v-if="isInclude"
           icon small color="#CFD8DC"
           @click.stop="removeCourse"
    >
      <v-icon> mdi-folder </v-icon>
    </v-btn>

    <v-btn v-else
           icon small color="#CFD8DC"
           @click.stop="addCourse"
    >
      <v-icon> mdi-folder-outline</v-icon>
    </v-btn>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import type { CourseInfo, ValidIdParams } from '@/types/CourseInfo';
import request from '@/util/request';
import useStorage from '@/util/useStorage';

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
  setup: (props, { root: { $store } }) => {
    const { getItem, setItem } = useStorage(localStorage);

    // computed?
    const courseInfo = {
      title: props.title,
      teacher: props.teacher,
    };

    const isInclude = computed(() => {
      const { courses }: {courses: CourseInfo[]} = $store.state.timetable;

      return courses.some((course) => (
        `{"title":"${course.title?.name?.jp}","teacher":"${course.lecturers?.[0]?.name?.jp}"}`
        === `{"title":"${props.title}","teacher":"${props.teacher}"}`
      ));
    });

    const removeCourse = () => {
      $store.commit('timetable/removeCourse', courseInfo);

      const courseIds: ValidIdParams[] = getItem('timetable/ids') || [];

      setItem('timetable/ids', courseIds.filter((courseId) => (
        `{"title":"${courseId.title}","teacher":"${courseId.teacher}"}`
        !== `{"title":"${courseInfo.title}","teacher":"${courseInfo.teacher}"}`
      )));
    };

    const addCourse = () => {
      const fetchAndStoreCourseForTimetable = async () => {
        try {
          const response = await request.axios.get(`search?query=${props.title}&teacher=${props.teacher}`);
          const courses: CourseInfo[] = response.data.Hits;
          const course = courses[0];

          if (course !== undefined) {
            $store.commit('timetable/addCourse', course);
          }
        } catch (e) {
          console.error(e.message);
        }
      };

      fetchAndStoreCourseForTimetable();

      const courseIds: ValidIdParams[] = getItem('timetable/ids') || [];

      courseIds.push(courseInfo);

      setItem('timetable/ids', courseIds);
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
