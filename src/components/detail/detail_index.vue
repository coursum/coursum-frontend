<template>
  <div class="ma-5">
    <div v-if="isLoading">
      loding
    </div>
    <div
      v-else
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
import { computed, defineComponent } from '@vue/composition-api';
import CourseShow from '@/components/course/course_show.vue';
import { CourseInfo, Tag, Registration } from '@/assets/CourseInfo';
import DetailShow from '@/components/detail/detail_show.vue';

export default defineComponent({
  name: 'DetailIndex',
  components: {
    DetailShow,
    CourseShow,
  },
  setup: (_, context) => {
    const courseData = computed((): CourseInfo => context.root.$store.state.course.course);

    const isLoading = computed((): boolean => context.root.$store.state.isLoading);

    const curLang = computed((): string => context.root.$i18n.locale);

    const registration = computed((): Registration => courseData?.value.registration);

    const related = computed((): null | undefined => courseData?.value.related);

    const classroom = computed((): string | null | undefined => courseData?.value.classroom);

    const types = computed((): null | undefined => courseData?.value.types);

    const tag = computed((): Tag => courseData?.value.tag);

    const curriculumCode = computed((): string | null
    | undefined => courseData?.value.curriculumCode);

    const width = computed((): object => {
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
      courseData,
    };
  },
});
</script>
