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
import type { Course, SearchResponse } from 'coursum-types';

import request from '@/util/request';
import useStorage from '@/util/use-storage';

export default defineComponent({
  name: 'TimetableMutationButton',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup: ({ id: courseId }, { root: { $store } }) => {
    const { getItem, setItem } = useStorage(localStorage);

    const isInclude = computed(() => {
      const { courses }: {courses: Course[]} = $store.state.timetable;

      return courses.some((course) => (course.yearClassId === courseId));
    });

    const removeCourse = () => {
      $store.commit('timetable/removeCourse', courseId);

      const courseIds: Course['yearClassId'][] = getItem('timetable/ids') || [];

      setItem('timetable/ids', courseIds.filter((id) => (id !== courseId)));
    };

    const addCourse = () => {
      const fetchAndStoreCourseForTimetable = async () => {
        try {
          const searchQuery = new URLSearchParams({ id: courseId });
          const querystring = searchQuery.toString();
          const response = await request.axios.get<SearchResponse<Course>>(`/search?${querystring}`);
          const courses = response.data.hits;

          if (courses) {
            const course = courses[0];

            $store.commit('timetable/addCourse', course);
          }
        } catch (e) {
          console.error(e.message);
        }
      };

      fetchAndStoreCourseForTimetable();

      const courseIds: Course['yearClassId'][] = getItem('timetable/ids') || [];

      courseIds.push(courseId);

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
  "ja": {
    "add": "時間割に追加",
    "remove": "時間割から外す"
  }
}
</i18n>
