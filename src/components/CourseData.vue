<template>
  <v-card
    elevation="2"
    height="190"
    width="500"
    class="my-2 black--text d-flex flex-column justify-space-between px-5 pt-5"
  >
    <div>
      <v-row class="pa-0 ma-0">
        <div class="col-9 pa-0 ma-0">
          <d-category :idx="idx" />
          <d-title :idx="idx" />
          <d-postscript :idx="idx" />
        </div>

        <v-spacer />

        <div class="col-3 pa-0 ma-0">
          <d-schedule-semester :idx="idx" />
          <d-schedule-times :idx="idx" />
        </div>
      </v-row>

      <d-summary :idx="idx" />
    </div>

    <div style="border-top: solid 1px #ebebeb">
      <v-row class="pa-0 ma-0">
        <d-lectures :idx="idx " />

        <v-spacer />

        <detail-button :idx="idx" />
        <t-button :id="courseDatas[idx].title.name.en" />
      </v-row>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import TButton from '@/components/TimeTable/TButton.vue';
import DetailButton from '@/components/DetailPage/DetailButton.vue';
import DCategory from '@/components/CourseData/DCategory.vue';
import DPostscript from '@/components/CourseData/DPostscript.vue';
import DScheduleSemester from '@/components/CourseData/DScheduleSemester.vue';
import DScheduleTimes from '@/components/CourseData/DScheduleTimes.vue';
import DSummary from '@/components/CourseData/DSummary.vue';
import DLectures from '@/components/CourseData/DLectures.vue';
import DTitle from '@/components/CourseData/DTitle.vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({

  name: 'CourseData',

  components: {
    TButton,
    DetailButton,
    DCategory,
    DPostscript,
    DScheduleSemester,
    DScheduleTimes,
    DSummary,
    DLectures,
    DTitle,
  },
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    courseDatas(): CourseInfo[] {
      return this.$store.state.courseDatas;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
