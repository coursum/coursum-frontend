<template>
  <div class="mx-0 my-6">
    <div v-if="isLoading" class="d-flex flex-wrap justify-space-around px-3">
      <v-skeleton-loader v-for="n in coursePerPage" :key="n"
                         height="300" width="500"
                         type="card" class="my-1"
      />
    </div>

    <template v-else-if="courseDatas !== null">
      <div class="d-flex flex-wrap justify-space-around px-3 align-content-start">
        <course-show v-for="(course, i) in currentShowingCourses" :key="i"
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
import { computed, defineComponent, ref } from '@vue/composition-api';

import type { CourseInfo } from '@/assets/CourseInfo';
import CourseShow from '@/components/course/course_show.vue';
import { injectStrict } from '@/util';
import { isLoadingKey } from '@/util/injectionKeys';

export default defineComponent({
  name: 'CourseIndex',
  components: {
    CourseShow,
  },
  setup: (_, context) => {
    const { $store } = context.root;

    const isLoading = injectStrict(isLoadingKey);

    // TODO: find an appropriate number
    const coursePerPage = 12;

    const courseDatas = computed<CourseInfo[]>(() => $store.state.course.courses);

    const currentSelectedPage = ref(1);

    const currentShowingCourses = computed<CourseInfo[]>(() => {
      // currentSelectedPageは1から始まる
      const start = (currentSelectedPage.value - 1) * coursePerPage;
      const end = start + coursePerPage;

      return courseDatas.value.slice(start, end);
    });

    const pgTotalLength = computed(() => Math.ceil(courseDatas.value.length / coursePerPage));

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
      isLoading,
      coursePerPage,
      courseDatas,
      currentSelectedPage,
      currentShowingCourses,
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
