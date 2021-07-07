<template>
  <div class="pa-6">
    <course-show v-for="course in timetableCourses" :key="course.yearClassId"
                 :has-width="true"
                 :course-data="course"
                 :show-summary="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import CourseShow from '@/components/course/course_show.vue';
import injectStrict from '@/util/inject-strict';
import { timetableCoursesKey } from '@/util/injection-keys';

export default defineComponent({
  name: 'TimetableShow',
  components: {
    CourseShow,
  },
  setup: () => {
    const timetableCourses = injectStrict(timetableCoursesKey);

    return {
      timetableCourses,
    };
  },

});
</script>
