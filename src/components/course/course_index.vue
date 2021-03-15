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
      <div class="d-flex flex-wrap justify-space-around px-3">
        <course-show
          v-for="n in pgPageSize"
          :key="n - 1"
          :course-data="courseDatas[pgPageSize * pgPage + n - 1 - pgPageSize]"
          :has-width="true"
        />
      </div>

      <div
        style="max-width: 70%"
        class="mx-auto my-6"
      >
        <v-pagination
          v-model="pgPage"
          class="mb-12"
          :length="pgLength"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseShow from '@/components/course/course_show.vue';

export default Vue.extend({
  name: 'CourseIndex',
  components: {
    CourseShow,
  },
  data() {
    return {
      pgPage: 1,
      pgPageSize: 12,
      word: '',
    };
  },
  computed: {
    pgLength() {
      const computed = Math.ceil(this.courseDatas.length / this.pgPageSize);
      return computed;
    },
    courseDatas() {
      return this.$store.state.course.courses;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
});
</script>
