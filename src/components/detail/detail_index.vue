<template>
  <div class="ma-5">
    <div v-if="isLoading">
      now loading...
    </div>
    <div v-else
         class="mx-auto"
         :style="width"
    >
      <course-show :course-data="course"
                   :text-truncate="false"
      />

      <detail-show :course-data="course" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from '@vue/composition-api';
import qs from 'qs';

import CourseShow from '@/components/course/course_show.vue';
import DetailShow from '@/components/detail/detail_show.vue';
import type { CourseInfo } from '@/types/CourseInfo';
import type { SearchResponse } from '@/types/Search';
import request from '@/util/request';

export default defineComponent({
  name: 'DetailIndex',
  components: {
    DetailShow,
    CourseShow,
  },
  setup: (_, context) => {
    const isLoading = ref(false);

    const course = ref<CourseInfo>();

    const fetchCourse = async () => {
      try {
        isLoading.value = true;

        const querystring = qs.stringify(context.root.$route.query);
        const response = await request.axios.get<SearchResponse<CourseInfo>>(`/search?${querystring}`);
        const courseHits = response.data.Hits;

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
      const breakpoint = context.root.$vuetify.breakpoint.name;
      let size;

      switch (breakpoint) {
        case 'xs':
          size = 100;
          break;
        case 'sm':
          size = 100;
          break;
        case 'md':
          size = 80;
          break;
        case 'lg':
          size = 60;
          break;
        case 'xl':
          size = 60;
          break;
        default:
          size = 30;
          break;
      }
      return { width: `${size}%` };
    });

    return {
      isLoading,
      width,
      course,
    };
  },
});
</script>
