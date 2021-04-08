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
        />
      </div>

      <div
        style="width: 500px"
        class="mx-auto my-6"
      >
        <v-pagination
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
import Vue from 'vue';
import CourseShow from '@/components/course/course_show.vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'CourseIndex',
  components: {
    CourseShow,
  },
  data: () => ({
    pgPageSize: 12,
    word: '',
  }),
  computed: {
    courseDatas(): CourseInfo[] {
      return this.$store.state.course.courses;
    },
    isLoading(): boolean {
      return this.$store.state.isLoading;
    },
    calcStartAndEndIndex(): number[] {
      // currentSelectedPageは1から始まる
      const start = (this.currentSelectedPage - 1) * this.pgPageSize;
      const end = start + this.pgPageSize;

      return [start, end];
    },
    currentShowingCourses(): CourseInfo[] {
      const [start, end] = this.calcStartAndEndIndex;

      return this.courseDatas.slice(start, end);
    },
    pgTotalLength(): number {
      // 全てのコースを表示させないといけないので切り上げる
      return Math.ceil(this.courseDatas.length / this.pgPageSize);
    },
    currentSelectedPage(): number {
      return this.$store.state.currentSelectedPage;
    },
  },
  methods: {
    goNextPage(): void {
      this.$store.commit('updateCurrentSelectedPage', this.currentSelectedPage + 1);
    },
    goPreviousPage(): void {
      this.$store.commit('updateCurrentSelectedPage', this.currentSelectedPage - 1);
    },
    goTargetPage(updatedValue: number): void {
      this.$store.commit('updateCurrentSelectedPage', updatedValue);
    },
  },
});
</script>
