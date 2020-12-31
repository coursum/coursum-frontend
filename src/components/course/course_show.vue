<template>
  <v-card
    v-if="courseData"
    :to="genRoute"
    :ripple="false"
    class="px-5 py-3 my-2 rounded-lg"
    :class="{ 'data-card': textTruncate, backgroundnone: !textTruncate }"
    :elevation="textTruncate ? 2 : 0"
    :style="hasWidth ? styleObject: ''"
  >
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="position: absolute; right: 5px; top: 5px"
          icon
          color="secondary"
          v-on="on"
          @click.prevent="attrs['aria-expanded'] = !attrs['aria-expanded']"
        >
          <v-icon> mdi-dots-horizontal </v-icon>
        </v-btn>
      </template>

      <timetable-mutation-button :id="genId" />
    </v-menu>

    <d-title :title="title" />
    <d-lectures
      :text-truncate="textTruncate"
      :lecturers="lecturers"
    />
    <d-postscript :postscript="postscript" />
    <d-summary
      v-if="showSummary"
      :title="courseData.title.name.jp"
      :summary="summary"
      :en="courseData.summary.en"
      :text-truncate="textTruncate"
    />

    <d-credit :credit="credit" />
    <d-schedule-semester :semester="semester" />
    <d-schedule-times :times="times" />
  </v-card>
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
import { Lecturer } from '@/assets/CourseInfo';

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
        return `/course-detail/${this.courseData?.title?.name?.jp} ${this.courseData.lecturers[0]?.name?.jp}`;
      }
      return undefined;
    },
    title(): string {
      return this.courseData?.title?.name?.[`${this.curLang}`];
    },
    postscript(): string {
      return this.courseData?.title?.postscript?.[`${this.curLang}`];
    },
    lecturers(): Lecturer[] {
      return this.courseData?.lecturers;
    },
    credit(): number {
      return this.courseData?.credit;
    },
    semester(): string {
      return this.courseData?.schedule?.semester?.[`${this.curLang}`];
    },
    times(): string {
      return this.courseData?.schedule?.times?.[`${this.curLang}`];
    },
    summary(): string {
      return this.courseData?.summary?.[`${this.curLang}`];
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
          size = 48;
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
  },

});
</script>

<style scoped>
.data-card:hover {
  background-color: var(--v-cover-base);
}

.backgroundnone {
  background-color: var(--v-white-base);
}
</style>
