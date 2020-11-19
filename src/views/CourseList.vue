<template>
  <div>
    <div
      v-if="isIndexPage && $vuetify.breakpoint.lgAndUp"
      style="width: 40%"
      class="mx-auto my-6"
    >
      <div class="text-h1 text-center secondary--text">
        Coursum
      </div>
      <search-bar />
    </div>

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
import SearchBar from '@/components/SearchBar.vue';

export default Vue.extend({
  name: 'CourseList',
  components: {
    SearchBar,
    CourseData,
  },
  data: () => ({
    pgPage: 1,
    pgPageSize: 12,
    pgLength: 20,
  }),
  computed: {
    isIndexPage() {
      if (this.$route.path === '/') {
        return true;
      }
      return false;
    },
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
      this.$store.commit('fetchData', '');
    },
  },
});
</script>
