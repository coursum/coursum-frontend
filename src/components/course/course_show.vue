<template>
  <v-hover v-if="courseData">
    <template v-slot:default="{ hover }">
      <v-card
        :class="cardClass(hover)"
        class="my-2 rounded-lg d-flex flex-column justify-space-between"
        :to="genRoute"
        :style="hasWidth ? styleObject: ''"
      >
        <timetable-mutation-button
          :id="genId"
          style="position: absolute; bottom: 5px; right: 5px"
        />

        <div
          class="rounded-t-lg py-2 title-bg"
        >
          <d-category :category="category" />
          <d-lectures
            :text-truncate="textTruncate"
            :lecturers="lecturers"
          />
          <d-title
            :title="title"
          />
        </div>

        <d-postscript :postscript="postscript" />
        <d-summary
          v-if="showSummary"
          class="py-2"
          :title="title"
          :summary="summary"
          :text-truncate="textTruncate"
        />

        <div
          class="px-4 py-2"
        >
          <d-credit :credit="credit" />
          <d-schedule-semester :semester="semester" />
          <d-schedule-times :times="times" />
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue';
import TimetableMutationButton from '@/components/timetable/timetable_mutation_button.vue';
import DPostscript from '@/components/course/data/d_postscript.vue';
import DScheduleSemester from '@/components/course/data/d_schedule_semester.vue';
import DScheduleTimes from '@/components/course/data/d_schedule_times.vue';
import DCredit from '@/components/course/data/d_credit.vue';
import DSummary from '@/components/course/data/d_summary.vue';
import DLectures from '@/components/course/data/d_lectures.vue';
import DTitle from '@/components/course/data/d_title.vue';
import { Lecturer, Basic } from '@/assets/CourseInfo';
import DCategory from '@/components/course/data/d_category.vue';

export default Vue.extend({

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
      type: Object,
      default() {
        return undefined;
      },
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
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    curLang(): string {
      return this.$i18n.locale;
    },
    genRoute(): string | undefined {
      if (this.textTruncate) {
        return `/course/${this.courseData?.title?.name?.jp} ${this.courseData.lecturers[0]?.name?.jp}`;
      }
      return undefined;
    },
    category(): Basic | undefined {
      return this.courseData?.category;
    },
    title(): Basic | undefined {
      return this.courseData?.title?.name;
    },
    postscript(): Basic | undefined {
      return this.courseData?.title?.postscript;
    },
    lecturers(): Lecturer[] | undefined {
      return this.courseData?.lecturers;
    },
    credit(): number | null | undefined {
      return this.courseData?.credit;
    },
    semester(): Basic | undefined {
      return this.courseData?.schedule?.semester;
    },
    times(): Basic | undefined {
      return this.courseData?.schedule?.times;
    },
    summary(): Basic | undefined {
      return this.courseData?.summary;
    },
    genId(): string {
      const id = `${this.title} ${this.lecturers?.[0]?.name?.jp}`;

      return id;
    },
    cardWidth(): number {
      const breakpoint = this.$vuetify.breakpoint.name;
      let size;

      switch (breakpoint) {
        case 'xs':
          size = 100;
          break;
        case 'sm':
          size = 80;
          break;
        case 'md':
          size = 48;
          break;
        case 'lg':
          size = 32;
          break;
        case 'xl':
          size = 30;
          break;
        default:
          size = 30;
          break;
      }
      return size;
    },
    styleObject(): object {
      return { width: `${this.cardWidth}%` };
    },
    cardClass() {
      const { textTruncate } = this;
      return (hover: boolean) => {
        let height;
        if (textTruncate) {
          if (hover) {
            height = 4;
          } else {
            height = 1;
          }
          return `elevation-${height} transition-swing`;
        }

        height = 1;
        return `elevation-${height}`;
      };
    },
  },
});
</script>

<style scoped>
.title-bg {
  background-color: var(--v-blue-base);
}
</style>
