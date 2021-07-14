<template>
  <div class="ma-5">
    <div v-if="isLoading">
      now loading...
    </div>
    <div v-else class="mx-auto" :style="width">
      <course-card :course-data="course" :text-truncate="false" />
      <course-detail :course-data="course" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from '@vue/composition-api';
import type { Course } from 'coursum-types';

import CourseCard from '@/components/course-card.vue';
import CourseDetail from '@/components/course-detail.vue';
import { fetch } from '@/util/request';

export default defineComponent({
  name: 'TheCourse',
  components: {
    CourseCard,
    CourseDetail,
  },
  setup: (_, context) => {
    const isLoading = ref(false);

    const course = ref<Course>();

    const fetchCourse = async () => {
      isLoading.value = true;
      const response = await fetch(context.root.$route.query);
      const courseHits = response.hits;
      isLoading.value = false;

      if (courseHits) {
        const courseHit = courseHits[0];
        course.value = courseHit.data;
      }
    };

    fetchCourse();

    watch(() => context.root.$route, fetchCourse);

    const width = computed(() => {
      const { name } = context.root.$vuetify.breakpoint;
      const widths = {
        xs: 100, sm: 100, md: 80, lg: 60, xl: 60,
      };

      return { width: `${(name in widths) ? widths[name] : 30}%` };
    });

    return {
      isLoading,
      width,
      course,
    };
  },
});
</script>
