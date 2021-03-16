<template>
  <v-hover v-if="courseData">
    <template v-slot:default="{ hover }">
      <v-card
        :class="cardClass(hover)"
        class="my-2 px-5 pb-2 pt-4 d-flex flex-column justify-space-between"
        :style="hasWidth ? cardWidth: ''"
        @click.prevent="goResult"
      >
        <div>
          <d-category :category="category" />

          <d-title
            :title="title"
          />

          <d-postscript :postscript="postscript" />

          <d-summary
            v-if="showSummary"
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
            <d-lectures
              :text-truncate="textTruncate"
              :lecturers="lecturers"
            />

            <timetable-mutation-button
              :title="titleForId"
              :teacher="teacherForId"
            />
          </div>
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
import request from '@/api/request';
import tool from '@/api/build_query';

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
    titleForId(): string {
      return `${this.courseData?.title?.name?.jp}`;
    },
    teacherForId(): string {
      return `${this.courseData?.lecturers?.[0]?.name?.jp}`;
    },
    cardWidth(): object {
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
      return { width: `${size}%` };
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
  methods: {
    async goResult() {
      const searchQuery = `?title=${this.title?.jp}&teacher=${this.lecturers?.[0]?.name?.jp}`;

      await request.fetchAndStoreCourse(`search${searchQuery}`);

      tool.goToResultPage(`/course-detail/search${searchQuery}`);
    },
  },
});
</script>
