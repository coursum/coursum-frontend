<template>
  <div class="mx-0 my-6">
    <div
      v-if="isLoading"
      class="d-flex flex-wrap justify-space-around px-3"
    >
      <v-skeleton-loader
        v-for="n in pgPageSize"
        :key="n"
        height="300"
        width="500"
        type="card"
        class="my-1"
      />
    </div>

    <template v-else-if="courseDatas !== null">
      <div
        class="d-flex flex-wrap justify-space-around px-3 align-content-start"
      >
        <course-show
          v-for="(course, i) in currentShowingCourses"
          :key="i"
          :course-data="course"
          :has-width="true"
          :has-height="true"
        />
      </div>

      <div
        style="width: 500px"
        class="mx-auto my-6"
      >
        <v-pagination
          color="pg"
          :value="currentSelectedPage"
          class="mb-12"
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
  computed, defineComponent, reactive, toRefs,
} from '@vue/composition-api';

import { CourseInfo } from '@/assets/CourseInfo';
import CourseShow from '@/components/course/course_show.vue';

export default defineComponent({
  name: 'CourseIndex',
  components: {
    CourseShow,
  },
  setup: (_, context) => {
    const state = reactive({
      pgPageSize: 12,
      word: '',
    });

    const courseDatas = computed((): CourseInfo[] => context.root.$store.state.course.courses);

    const isLoading = computed((): boolean => context.root.$store.state.isLoading);

    const currentSelectedPage = computed((): number => context.root.$store
      .state.currentSelectedPage);

    const calcStartAndEndIndex = computed((): number[] => {
      // currentSelectedPageは1から始まる
      const start = (currentSelectedPage.value - 1) * state.pgPageSize;
      const end = start + state.pgPageSize;

      return [start, end];
    });

    const currentShowingCourses = computed((): CourseInfo[] => {
      const [start, end] = calcStartAndEndIndex.value;

      return courseDatas.value.slice(start, end);
    });

    const pgTotalLength = computed((): number => Math
      .ceil(courseDatas.value.length / state.pgPageSize));

    const goNextPage = (): void => {
      context.root.$store.commit('updateCurrentSelectedPage', currentSelectedPage.value + 1);
    };

    const goPreviousPage = (): void => {
      context.root.$store.commit('updateCurrentSelectedPage', currentSelectedPage.value - 1);
    };

    const goTargetPage = (updatedValue: number): void => {
      context.root.$store.commit('updateCurrentSelectedPage', updatedValue);
    };

    return {
      isLoading,
      currentShowingCourses,
      pgTotalLength,
      goNextPage,
      goPreviousPage,
      goTargetPage,
      currentSelectedPage,
      courseDatas,
      ...toRefs(state),
    };
  },
});
</script>
