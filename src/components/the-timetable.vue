<template>
  <div class="pa-6">
    <course-card v-for="course in timetableCourses" :key="course.id"
                 :course-data="course" :show-summary="false" :has-width="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import CourseCard from '@/components/course-card.vue';
import injectStrict from '@/util/inject-strict';
import { timetableCoursesKey } from '@/util/injection-keys';

export default defineComponent({
  name: 'TheTimetable',
  components: {
    CourseCard,
  },
  setup: () => {
    const timetableCourses = injectStrict(timetableCoursesKey);

    return {
      timetableCourses,
    };
  },

});
</script>
