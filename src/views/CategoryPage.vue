<template>
  <div>
    <v-row
      v-if="isLoading"
      justify="space-around"
      class="mx-0 my-6 pa-5"
    >
      <v-skeleton-loader
        v-for="n in pgPageSize"
        :key="n"
        width="500"
        height="190"
        type="card"
        class="my-2"
      />
    </v-row>

    <v-row
      v-else
      justify="space-around"
      class="mx-0 my-6 pa-5"
    >
      <course-data
        v-for="n in pgPageSize"
        :key="n"
        :idx="(pgPageSize * pgPage + n) - pgPageSize"
      />
      <div
        style="max-width: 500px"
        class="mx-auto"
      >
        <v-pagination
          v-model="pgPage"
          class="mb-12"
          :length="pgLength"
        />
      </div>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseData from '@/components/CourseData.vue';

interface To {
  path: string;
  fullPath: string;
  params: {pathMatch: string};
  name: string;
  matched: [];
}

export default Vue.extend({
  name: 'CourseList',
  components: {
    CourseData,
  },
  data: () => ({
    pgPage: 1,
    pgPageSize: 12,
    pgLength: 20,
  }),
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    courseDatas() {
      return this.$store.state.courseDatas;
    },
  },
  async created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const curPath = this.$route.path.split('/');
      const curCategory = curPath[curPath.length - 1];
      this.$store.commit('fetchData', curCategory);
    },
  },
});
</script>
