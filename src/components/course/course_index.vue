<template>
  <div class="mx-0 my-6">
    <div v-if="isLoading" class="d-flex flex-wrap justify-space-around px-3">
      <v-skeleton-loader v-for="n in coursePerPage" :key="n"
                         height="300" width="500"
                         type="card" class="my-1"
      />
    </div>

    <template v-else-if="courses !== null">
      <div class="d-flex flex-wrap justify-space-around px-3 align-content-start">
        <course-show v-for="course in currentShowingCourses" :key="course.yearClassId"
                     :course-data="course"
                     :has-width="true"
                     :has-height="true"
        />
      </div>

      <div class="pagination mx-auto my-6">
        <v-pagination class="mb-12"
                      color="pg"
                      :value="currentSelectedPage"
                      :length="pgTotalLength"
                      @previous="goPreviousPage"
                      @next="goNextPage"
                      @input="goTargetPage"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from '@vue/composition-api';
import qs from 'qs';

import CourseShow from '@/components/course/course_show.vue';
import type { CourseInfo } from '@/types/CourseInfo';
import type { SearchResponse } from '@/types/Search';
import request from '@/util/request';

const usePagination = () => {
  const currentSelectedPage = ref(1);

  const goPreviousPage = () => {
    currentSelectedPage.value -= 1;
  };

  const goNextPage = () => {
    currentSelectedPage.value += 1;
  };

  const goTargetPage = (updatedValue: number) => {
    currentSelectedPage.value = updatedValue;
  };

  return {
    currentSelectedPage,
    goPreviousPage,
    goNextPage,
    goTargetPage,
  };
};

export default defineComponent({
  name: 'CourseIndex',
  components: {
    CourseShow,
  },
  setup: (_, context) => {
    const {
      currentSelectedPage,
      goPreviousPage,
      goNextPage,
      goTargetPage,
    } = usePagination();

    const isLoading = ref(false);
    const courses = ref<CourseInfo[]>([]);

    // TODO: find an appropriate number
    const coursePerPage = 12;

    const currentShowingCourses = computed<CourseInfo[]>(() => {
      // currentSelectedPageは1から始まる
      const start = (currentSelectedPage.value - 1) * coursePerPage;
      const end = start + coursePerPage;

      return courses.value.slice(start, end);
    });

    const pgTotalLength = computed(() => Math.ceil(courses.value.length / coursePerPage));

    const fetchCourses = async () => {
      try {
        isLoading.value = true;

        // TODO: wrap request function
        const querystring = qs.stringify(context.root.$route.query);
        const response = await request.axios.get<SearchResponse<CourseInfo>>(`/search?${querystring}`);
        const courseHits = response.data.Hits;

        if (courseHits) {
          courses.value = courseHits;
        }
      } catch (e) {
        console.error(e.message);
      } finally {
        isLoading.value = false;
      }
    };

    fetchCourses();

    watch(() => context.root.$route, fetchCourses);

    return {
      isLoading,
      coursePerPage,
      courses,
      currentShowingCourses,
      currentSelectedPage,
      pgTotalLength,
      goPreviousPage,
      goNextPage,
      goTargetPage,
    };
  },
});
</script>

<style scoped>
div.pagination {
  width: 500px;
}
</style>
