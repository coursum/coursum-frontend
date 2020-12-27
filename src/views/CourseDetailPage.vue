<template>
  <div
    class="mx-auto my-6 px-5"
  >
    <div
      v-if="!isLoading"
    >
      <course-data
        :course-data="courseData"
        :text-truncate="false"
      />

      <div>
        <d-registration :registration="registration" />
      </div>
      <d-class
        :classroom="classroom"
        :related="related"
        :types="types"
        :tag="tag"
        :curriculum-code="curriculumCode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DRegistration from '@/components/CourseData/DRegistration.vue';
import DClass from '@/components/CourseData/DClass.vue';
import axios from 'axios';
import CourseData from '@/components/CourseData.vue';
import { CourseInfo, Tag, Registration } from '@/assets/CourseInfo';

const data: CourseInfo = {
  category: { en: undefined, jp: undefined, kana: undefined },
  language: { en: undefined, jp: undefined, kana: undefined },
  lecturers: [{
    imgUrl: undefined,
    name: { en: undefined, jp: undefined, kana: undefined },
    id: undefined,
    email: undefined,
    inCharge: undefined,
  }],
  title: {
    postscript: { en: undefined, jp: undefined, kana: undefined },
    name: { en: undefined, jp: undefined, kana: undefined },
  },
  schedule: {
    year: undefined,
    span: { en: undefined, jp: undefined, kana: undefined },
    semester: { en: undefined, jp: undefined, kana: undefined },
    times: { en: undefined, jp: undefined, kana: undefined },
  },
  related: undefined,
  registration: {
    number: undefined,
    suggestion: { en: undefined, jp: undefined, kana: undefined },
    requirement: { en: undefined, jp: undefined, kana: undefined },
    prerequisite: undefined,
  },
  classroom: undefined,
  summary: {
    en: undefined,
    jp: undefined,
    kana: undefined,
  },
  types: undefined,
  yearClassId: undefined,
  tag: { giga: undefined },
  curriculumCode: undefined,
  credit: undefined,
};

export default Vue.extend({

  name: 'CourseDetailPage',

  components: {
    CourseData,
    DClass,
    DRegistration,
  },

  data() {
    return {
      isLoading: true,
      courseData: data,
    };
  },

  computed: {
    curLang(): string {
      return this.$i18n.locale;
    },
    registration(): Registration {
      return this.courseData?.registration;
    },
    related(): null | undefined {
      return this.courseData?.related;
    },
    classroom(): string | null | undefined {
      return this.courseData?.classroom;
    },
    types(): null | undefined {
      return this.courseData?.types;
    },
    tag(): Tag {
      return this.courseData?.tag;
    },
    curriculumCode(): string | null | undefined {
      return this.courseData?.curriculumCode;
    },
  },

  async created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const url = new URL('http://54.248.214.173:8000/search');
      url.search = `query=${this.$route.params.id}`;
      this.isLoading = true;
      try {
        const response = await axios.get(url.href);
        const datas = JSON.parse(JSON.stringify(response.data)).Hits;
        [this.courseData] = datas.filter((dataObj: CourseInfo) => {
          const id = `${dataObj?.title?.name?.jp} ${dataObj?.lecturers[0]?.name?.jp}`;
          return this.$route.params.id === id;
        });
        if (this.courseData === null) {
          throw new Error();
        }
      } catch (e) {
        this.$router.push('/404');
      } finally {
        this.isLoading = false;
      }
    },
  },

});
</script>
