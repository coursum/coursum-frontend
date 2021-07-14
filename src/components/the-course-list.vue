<template>
  <!-- 6 looks good to me -->
  <div class="mx-6">
    <v-row v-if="!isLoading">
      <v-col>{{ searchMsg }}</v-col>
    </v-row>
    <v-row justify="space-around">
      <template v-if="isLoading">
        <!-- TODO: find a better solution instead of hard coding 50 -->
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
      </template>
      <template v-else>
        <v-col v-for="courseCard in courseCards"
               :key="courseCard.courseHit.data.yearClassId"
               lg="3" md="4" sm="6" cols="12"
        >
          <v-sheet min-height="250" class="fill-height" color="transparent">
            <v-lazy v-model="courseCard.isActive" class="fill-height">
              <course-card :course-data="courseCard.courseHit.data" />
            </v-lazy>
          </v-sheet>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import type { Course, SearchResponse } from 'coursum-types';

import CourseCard from '@/components/course-card.vue';
import { fetch } from '@/util/request';

interface LazyCourseCard {
  courseHit: SearchResponse<Course>['hits'][0];
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

    const searchMsg = ref('');

    const fetchCourses = async () => {
      isLoading.value = true;
      const response = await fetch(context.root.$route.query);
      const courseHits = response.hits;
      isLoading.value = false;

      if (courseHits) {
        courseCards.value = courseHits.map((courseHit) => ({ courseHit, isActive: false }));
      }

      const latency = response.stat.latency / 1000;
      searchMsg.value = `${courseCards.value.length} results (${latency > 0 ? latency : 'less then 0.001'} seconds)`;
    };

    fetchCourses();

    watch(() => context.root.$route, fetchCourses);

    return {
      searchMsg,
      isLoading,
      courseCards,
    };
  },
});
</script>
