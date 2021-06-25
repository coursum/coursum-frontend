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
import type { PropType, SetupContext } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import DCategory from '@/components/course/data/d_category.vue';
import DCredit from '@/components/course/data/d_credit.vue';
import DLectures from '@/components/course/data/d_lectures.vue';
import DPostscript from '@/components/course/data/d_postscript.vue';
import DScheduleSemester from '@/components/course/data/d_schedule_semester.vue';
import DScheduleTimes from '@/components/course/data/d_schedule_times.vue';
import DSummary from '@/components/course/data/d_summary.vue';
import DTitle from '@/components/course/data/d_title.vue';
import TimetableMutationButton from '@/components/timetable/timetable_mutation_button.vue';
import type { CourseInfo } from '@/types/CourseInfo';

interface Props {
  courseData: PropType<CourseInfo>;
  showSummary: boolean;
  textTruncate: boolean;
  hasWidth: boolean;
  hasHeight: boolean;
}

const useCard = ({ textTruncate, hasWidth, hasHeight }: Partial<Props>, context: SetupContext) => {
  const cardWidth = computed(() => {
    const { name } = context.root.$vuetify.breakpoint;
    const widths = {
      xs: 100, sm: 80, md: 48, lg: 32, xl: 30,
    };

    if (name in widths) return widths[name];

    return 30;
  });

  const cardClass = computed(() => (hover: boolean) => {
    let height;
    const classes: string[] = [];

    if (textTruncate) {
      height = hover ? 4 : 1;
      classes.push('transition-swing');
    } else {
      height = 1;
    }
    classes.push(`elevation-${height}`);

    return classes.join(' ');
  });

  const cardStyle = computed(() => {
    const width = hasWidth ? { width: `${cardWidth.value}%` } : {};
    const height = (hasWidth && hasHeight) ? { height: '230px' } : {};

    return { ...width, ...height };
  });

  return {
    cardWidth,
    cardClass,
    cardStyle,
  };
};

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
    showSummary: {
      type: Boolean,
      default: true,
    },
    textTruncate: {
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
    const { $router } = context.root;

    const course = props.courseData;
    const curLang = context.root.$i18n.locale;
    const title = course.title.name;
    const { category } = course;
    const { postscript } = course.title;
    const { lecturers } = course;
    const { credit } = course;
    const { semester } = course.schedule;
    const { times } = course.schedule;
    const { summary } = course;
    const titleForId = String(course.title.name.jp);
    const teacherForId = String(course.lecturers?.[0].name.jp);

    const { textTruncate, hasWidth, hasHeight } = props;
    const {
      cardClass,
      cardStyle,
    } = useCard({ textTruncate, hasWidth, hasHeight }, context);

    const goResult = async () => {
      const searchQuery = new URLSearchParams({
        title: title.jp || '',
        teacher: lecturers?.[0]?.name?.jp || '',
      });

      await $router.push(`/course/search?${searchQuery.toString()}`);
    };

    return {
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

      cardClass,
      cardStyle,

      goResult,
    };
  },
});
</script>
