<template>
  <div
    class="ma-5"
  >
    <div
      v-if="!isLoading"
      :style="width"
      class="mx-auto"
    >
      <course-show
        :course-data="courseData"
        :text-truncate="false"
      />

      <detail-show
        :registration="registration"
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
import CourseShow from '@/components/course/course_show.vue';
import {
  CourseInfo, Tag, Registration, courseTemplate,
} from '@/assets/CourseInfo';
import DetailShow from '@/components/detail/detail_show.vue';
import request from '@/api/request';

export default Vue.extend({
  name: 'DetailIndex',
  components: {
    DetailShow,
    CourseShow,
  },
  data() {
    return {
      isLoading: true,
      courseData: courseTemplate,
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
    width(): object {
      const breakpoint = this.$vuetify.breakpoint.name;
      let size;

      switch (breakpoint) {
        case 'xs':
          size = 100;
          break;
        case 'sm':
          size = 100;
          break;
        case 'md':
          size = 80;
          break;
        case 'lg':
          size = 60;
          break;
        case 'xl':
          size = 60;
          break;
        default:
          size = 30;
          break;
      }
      return { width: `${size}%` };
    },
  },
  async created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const config = {
        query: this.$route.params.id,
      };

      try {
        this.isLoading = true;
        const datas = await request.fetchData(config);
        [this.courseData] = datas.filter((dataObj: CourseInfo) => {
          const id = `${dataObj?.title?.name?.jp} ${dataObj?.lecturers[0]?.name?.jp}`;
          return this.$route.params.id === id;
        });
        if (this.courseData === null) {
          throw new Error();
        }
      } catch (e) {
        console.error(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },

});
</script>
