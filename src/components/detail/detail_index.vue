<template>
  <div class="ma-5">
    <div v-if="isLoading">
      now loading...
    </div>
    <div v-else
         class="mx-auto"
         :style="width"
    >
      <course-show :course-data="course"
                   :text-truncate="false"
      />

      <detail-show :registration="registration"
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
import {
  computed, defineComponent, ref, watch,
} from '@vue/composition-api';
import qs from 'qs';

import type { CourseInfo } from '@/assets/CourseInfo';
import CourseShow from '@/components/course/course_show.vue';
import DetailShow from '@/components/detail/detail_show.vue';
import request from '@/util/request';

export default defineComponent({
  name: 'DetailIndex',
  components: {
    DetailShow,
    CourseShow,
  },
  setup: (_, context) => {
    const isLoading = ref(false);
    const curLang = computed((): string => context.root.$i18n.locale);

    const course = ref<CourseInfo>();
    const registration = ref<CourseInfo['registration']>();
    const related = ref<CourseInfo['related']>();
    const classroom = ref<CourseInfo['classroom']>();
    const types = ref<CourseInfo['types']>();
    const tag = ref<CourseInfo['tag']>();
    const curriculumCode = ref<CourseInfo['curriculumCode']>();

    const fetchCourse = async () => {
      try {
        isLoading.value = true;

        const querystring = qs.stringify(context.root.$route.query);
        const response = await request.axios.get(`/search?${querystring}`);

        const hitCourse: CourseInfo = response.data.Hits[0];

        course.value = hitCourse;
        registration.value = hitCourse.registration;
        related.value = hitCourse.related;
        classroom.value = hitCourse.classroom;
        types.value = hitCourse.types;
        tag.value = hitCourse.tag;
        curriculumCode.value = hitCourse.curriculumCode;
      } catch (e) {
        console.error(e.message);
      } finally {
        isLoading.value = false;
      }
    };

    fetchCourse();

    watch(() => context.root.$route, fetchCourse);

    const width = computed(() => {
      const breakpoint = context.root.$vuetify.breakpoint.name;
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
    });

    return {
      isLoading,
      curLang,
      registration,
      related,
      classroom,
      types,
      curriculumCode,
      tag,
      width,
      course,
    };
  },
});
</script>
