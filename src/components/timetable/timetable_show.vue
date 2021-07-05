<template>
  <div class="pa-6">
    <div v-if="isLoading">
      now loading...
    </div>
    <div v-else>
      <course-show v-for="course in timetableCourses" :key="course.yearClassId"
                   :has-width="true"
                   :course-data="course"
                   :show-summary="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import CourseShow from '@/components/course/course_show.vue';
import injectStrict from '@/util/inject-strict';
import { isLoadingKey, timetableCoursesKey } from '@/util/injection-keys';

export default defineComponent({
  name: 'TimetableShow',
  components: {
    CourseShow,
  },
  setup: () => {
    const isLoading = injectStrict(isLoadingKey);
    const timetableCourses = injectStrict(timetableCoursesKey);

    return {
      isLoading,
      timetableCourses,
    };
  },

});
</script>
