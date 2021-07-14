<template>
  <div class="mx-0 my-6">
    <v-container>
      <v-row v-if="isLoading">
        <v-col v-for="(skeleton, idx) in Array(50).fill(0).map(() => ({ isActive: false }))"
               :key="idx"
               lg="3" md="4" sm="6" cols="12"
        >
          <v-sheet min-height="250" class="fill-height" color="transparent">
            <v-lazy v-model="skeleton.isActive" class="fill-height">
              <v-skeleton-loader type="card" />
            </v-lazy>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="courseCard in courseCards"
               :key="courseCard.course.yearClassId"
               lg="3" md="4" sm="6" cols="12"
        >
          <v-sheet min-height="250" class="fill-height" color="transparent">
            <v-lazy v-model="courseCard.isActive" class="fill-height">
              <course-card :course-data="courseCard.course" />
            </v-lazy>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import type { Course } from 'coursum-types';

import CourseCard from '@/components/course-card.vue';
import { fetch } from '@/util/request';

interface LazyCourseCard {
  course: Course;
  isActive: boolean;
}

export default defineComponent({
  name: 'TheCourseList',
  components: {
    CourseCard,
  },
  setup: (_, context) => {
    const isLoading = ref(false);
    const courseCards = ref<LazyCourseCard[]>([]);

    const fetchCourses = async () => {
      isLoading.value = true;
      const courseHits = await fetch(context.root.$route.query);
      isLoading.value = false;

      if (courseHits) {
        courseCards.value = courseHits.map(({ data }) => ({ course: data, isActive: false }));
      }
    };

    fetchCourses();

    watch(() => context.root.$route, fetchCourses);

    return {
      isLoading,
      courseCards,
    };
  },
});
</script>
