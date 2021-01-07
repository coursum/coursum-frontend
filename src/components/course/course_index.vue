<template>
  <div>
    <div
      class="d-flex flex-row-reverse pt-3 pr-3"
    >
      <setting-button />
      <account-button />
    </div>

    <div
      class="mx-auto text-center"
    >
      <coursum-logo />

      <keep-alive>
        <search-input />
      </keep-alive>

      <keep-alive>
        <advanced-inputs />
      </keep-alive>
    </div>

    <div class="mx-0 my-6">
      <div
        v-if="isLoading"
        class="d-flex flex-column px-3"
      >
        <v-skeleton-loader
          v-for="n in pgPageSize"
          :key="n"
          height="180"
          type="card"
          class="my-1"
        />
      </div>

      <template
        v-else-if="courseDatas !== null"
      >
        <div
          class="d-flex flex-wrap justify-space-around px-3"
        >
          <course-show
            v-for="n in pgPageSize"
            :key="n-1"
            :course-data="courseDatas[(pgPageSize * pgPage + n-1) - pgPageSize]"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { courseTemplate } from '@/assets/CourseInfo';
import AccountButton from '@/components/course/account_button.vue';
import SettingButton from '@/components/setting/setting_button.vue';
import CoursumLogo from '@/components/course/coursum_logo.vue';
import SearchInput from '@/components/search/search_input.vue';
import AdvancedInputs from '@/components/search/advanced_inputs.vue';
import CourseShow from '@/components/course/course_show.vue';
import request from '@/api/request';

export default Vue.extend({
  name: 'CourseIndex',
  components: {
    AccountButton,
    SettingButton,
    CoursumLogo,
    SearchInput,
    AdvancedInputs,
    CourseShow,
  },
  data() {
    return {
      pgPage: 1,
      pgPageSize: 12,
      word: '',
      courseDatas: [courseTemplate],
      isLoading: false,
    };
  },
  computed: {
    pgLength() {
      const computed = Math.ceil(this.courseDatas.length / this.pgPageSize);
      return computed;
    },
  },
  watch: {
    async $route() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const config = {
        query: '',
      };

      if (this.$route.path === '/') {
        config.query = '';
      } else {
        config.query = this.$route.params.query;
      }

      try {
        this.isLoading = true;
        this.courseDatas = await request.fetchData(config);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
