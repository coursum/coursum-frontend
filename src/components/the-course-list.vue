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
        <course-card v-for="course in currentShowingCourses" :key="course.yearClassId"
                     :course-data="course"
                     :has-width="true"
                     :has-height="true"
        />
      </div>

      <div class="pagination mx-auto my-6">
        <v-pagination class="mb-12"
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
import type { Course } from 'coursum-types';

import CourseCard from '@/components/course-card.vue';
import { fetch } from '@/util/request';

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
  name: 'TheCourseList',
  components: {
    CourseCard,
  },
  setup: (_, context) => {
    const {
      currentSelectedPage,
      goPreviousPage,
      goNextPage,
      goTargetPage,
    } = usePagination();

    const isLoading = ref(false);
    const courses = ref<Course[]>([]);

    // TODO: find an appropriate number
    const coursePerPage = 12;

    const currentShowingCourses = computed<Course[]>(() => {
      // currentSelectedPageは1から始まる
      const start = (currentSelectedPage.value - 1) * coursePerPage;
      const end = start + coursePerPage;

      return courses.value.slice(start, end);
    });

    const pgTotalLength = computed(() => Math.ceil(courses.value.length / coursePerPage));

    const fetchCourses = async () => {
      isLoading.value = true;
      const courseHits = await fetch(context.root.$route.query);
      isLoading.value = false;

      if (courseHits) {
        courses.value = courseHits.map(({ data }) => data);
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
