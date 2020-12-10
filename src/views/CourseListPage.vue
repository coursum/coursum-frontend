<template>
  <div>
    <div
      v-if="$vuetify.breakpoint.lgAndUp"
      style="width: 40%"
      class="mx-auto my-6"
    >
      <div class="text-h1 text-center secondary--text">
        Coursum
      </div>
      <search-bar />
    </div>

    <div class="mx-0 my-6 pa-5">
      <v-chip
        v-if="isCategPage"
        large
        class="px-6"
        color="primary"
        outlined
        label
      >
        {{ word }}
      </v-chip>

      <v-row
        v-if="isLoading"
        justify="space-around"
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

      <div
        v-else
      >
        <v-row justify="space-around">
          <!-- <course-data
            v-for="n in pgPageSize"
            :key="n"
            :idx="(pgPageSize * pgPage + n) - pgPageSize"
          /> -->
          <course-data
            v-for="n in pgPageSize"
            :key="n-1"
            :idx="(pgPageSize * pgPage + n-1) - pgPageSize"
          />
        </v-row>
        <div
          style="max-width: 500px"
          class="mx-auto my-12"
        >
          <v-pagination
            v-model="pgPage"
            class="mb-12"
            :length="pgLength"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseData from '@/components/CourseData.vue';
import SearchBar from '@/components/SearchBar.vue';

export default Vue.extend({
  name: 'CourseListPage',
  components: {
    SearchBar,
    CourseData,
  },
  data() {
    return {
      pgPage: 1,
      pgPageSize: 12,
      isCategPage: true,
      word: '',
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    pgLength() {
      const tmp = Math.ceil(this.$store.state.length / this.pgPageSize);
      return tmp;
    },
  },
  watch: {
    async $route() {
      this.fetchData();
    },
  },
  async created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { path } = this.$route;
      const params = path.split('/').slice(1);
      let word;

      if (params[0] === 'category') {
        word = params.slice(1).join(' ');
        this.word = word;
        this.isCategPage = true;
      } else if (params[0] === 'search') {
        word = params.slice(1);
      } else {
        word = '';
        this.isCategPage = false;
      }
      this.$store.commit('fetchData', `query=${word}`);
    },
  },
});
</script>
