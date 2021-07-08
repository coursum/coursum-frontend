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
import type { Course, SearchResponse } from 'coursum-types';
import qs from 'qs';

import CourseCard from '@/components/course-card.vue';
import CourseDetail from '@/components/course-detail.vue';
import { axios } from '@/util/request';

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
      try {
        isLoading.value = true;

        const querystring = qs.stringify(context.root.$route.query);
        const response = await axios.get<SearchResponse<Course>>(`/search?${querystring}`);
        const courseHits = response.data.hits;

        if (courseHits) {
          const courseHit = courseHits[0];
          course.value = courseHit;
        }
      } catch (e) {
        console.error(e.message);
      } finally {
        isLoading.value = false;
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
