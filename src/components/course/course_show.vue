<template>
  <v-hover v-if="courseData">
    <template v-slot:default="{ hover }">
      <v-card class="my-2 px-5 pb-2 pt-4 d-flex flex-column justify-space-between"
              :class="cardClass(hover)"
              :style="cardStyle"
              @click.prevent="goResult"
      >
        <div>
          <d-category :category="category" />
          <d-title :title="title" />
          <d-postscript :postscript="postscript" />
          <d-summary v-if="showSummary"
                     :title="title"
                     :summary="summary"
                     :text-truncate="textTruncate"
          />
        </div>

        <div>
          <div class="d-flex d-column justify-space-between">
            <div>
              <d-credit :credit="credit" />
              <d-schedule-semester :semester="semester" />
            </div>
            <d-schedule-times :times="times" />
          </div>

          <v-divider class="my-1" />

          <div class="d-flex justify-space-between align-center">
            <d-lectures :text-truncate="textTruncate" :lecturers="lecturers" />
            <timetable-mutation-button :title="titleForId" :teacher="teacherForId" />
          </div>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { Basic, CourseInfo, Lecturer } from '@/assets/CourseInfo';
import DCategory from '@/components/course/data/d_category.vue';
import DCredit from '@/components/course/data/d_credit.vue';
import DLectures from '@/components/course/data/d_lectures.vue';
import DPostscript from '@/components/course/data/d_postscript.vue';
import DScheduleSemester from '@/components/course/data/d_schedule_semester.vue';
import DScheduleTimes from '@/components/course/data/d_schedule_times.vue';
import DSummary from '@/components/course/data/d_summary.vue';
import DTitle from '@/components/course/data/d_title.vue';
import TimetableMutationButton from '@/components/timetable/timetable_mutation_button.vue';
import { injectStrict } from '@/util';
import { setLoadingStateKey } from '@/util/injectionKeys';
import request from '@/util/request';

export default defineComponent({
  name: 'CourseShow',
  components: {
    TimetableMutationButton,
    DPostscript,
    DScheduleSemester,
    DScheduleTimes,
    DCredit,
    DSummary,
    DLectures,
    DTitle,
    DCategory,
  },
  props: {
    courseData: {
      type: Object as PropType<CourseInfo>,
      required: true,
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
    showSummary: {
      type: Boolean,
      default: true,
    },
    hasWidth: {
      type: Boolean,
      default: false,
    },
    hasHeight: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const {
      $vuetify, $i18n, $store, $router,
    } = context.root;

    const setLoadingState = injectStrict(setLoadingStateKey);

    const title = computed((): Basic | undefined => props.courseData?.title?.name);

    const curLang = computed((): string => $i18n.locale);

    const category = computed((): Basic | undefined => props.courseData?.category);

    const postscript = computed((): Basic | undefined => props.courseData?.title?.postscript);

    const lecturers = computed((): Lecturer[] | undefined => props.courseData?.lecturers);

    const credit = computed((): number | null | undefined => props.courseData?.credit);

    const semester = computed((): Basic | undefined => props.courseData?.schedule?.semester);

    const times = computed((): Basic | undefined => props.courseData?.schedule?.times);

    const summary = computed((): Basic | undefined => props.courseData?.summary);

    const titleForId = computed((): string => `${props.courseData?.title?.name?.jp}`);

    const teacherForId = computed((): string => `${props.courseData?.lecturers?.[0]?.name?.jp}`);

    const cardWidth = computed((): number => {
      switch ($vuetify.breakpoint.name) {
        case 'xs':
          return 100;
        case 'sm':
          return 80;
        case 'md':
          return 48;
        case 'lg':
          return 32;
        case 'xl':
          return 30;
        default:
          return 30;
      }
    });

    const cardClass = computed(() => (hover: boolean) => {
      let height;

      if (props.textTruncate) {
        if (hover) {
          height = 4;
        } else {
          height = 1;
        }
        return `elevation-${height} transition-swing`;
      }

      height = 1;
      return `elevation-${height}`;
    });

    const cardStyle = computed(() => {
      if (!props.hasWidth) {
        return {};
      }

      if (props.hasHeight) {
        return {
          width: `${cardWidth.value}%`,
          height: '230px',
        };
      }

      return { width: `${cardWidth.value}%` };
    });

    const goResult = async () => {
      const searchQuery = `title=${title.value?.jp}&teacher=${lecturers.value?.[0]?.name?.jp}`;

      await $router.push(`/course/search?${searchQuery}`);

      try {
        setLoadingState(true);

        const response = await request.axios.get(`search?${searchQuery}`);
        const courses: CourseInfo[] = response.data.Hits;
        const course = courses[0];

        $store.commit('course/setCourse', course);
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoadingState(false);
      }
    };

    return {
      goResult,
      cardClass,
      curLang,
      category,
      postscript,
      credit,
      semester,
      times,
      summary,
      titleForId,
      teacherForId,
      lecturers,
      title,
      cardStyle,
    };
  },
});
</script>
