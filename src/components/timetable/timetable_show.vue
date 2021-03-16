<template>
  <div class="pa-6">
    <div v-if="isLoading">
      now loading...
    </div>
    <div v-else>
      <course-show
        v-for="(course, n) in courses"
        :key="n"
        :has-width="true"
        :course-data="course"
        :show-summary="false"
      />

      <!-- <div
        v-for="(d, i) in sorted"
        :key="i"
      >
        <div class="my-6">
          <div
            v-if="idx(d) === 100"
            class="secondary--text font-weight-bold"
          >
            {{ $t("days")[6] }}
          </div>
          <div
            v-else
            class="secondary--text font-weight-bold"
          >
            {{ $t("days")[idx(d)] }}
          </div>

          <course-show
            v-for="(t, n) in d"
            :key="n"
            :has-width="true"
            :course-data="courseDatas[t[0]]"
            :show-summary="false"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';
import CourseShow from '@/components/course/course_show.vue';

export default Vue.extend({

  name: 'TimetableShow',

  components: {
    CourseShow,
  },

  data() {
    return {
      isSharedPage: false,
      sortedIDs: [] as [string, number[]][],
    };
  },
  computed: {
    courses(): CourseInfo[] {
      return this.$store.state.timetable.courses;
    },
    ids(): string[] {
      return this.$store.state.timetable.ids;
    },
    isLoading(): boolean {
      return this.$store.state.isLoading;
    },
    sorted(): [string, number[]][][] {
      const daySort = this.sortedIDs;
      const result: [string, number[]][][] = [];
      let temp: [string, number[]][] = [];

      daySort.sort(([, [day1]], [, [day2]]) => day1 - day2);

      let yesterday = 0;

      daySort.forEach((arr, idx) => {
        const [, [curDay]] = arr;

        if (idx === daySort.length - 1) {
          result.push([...temp, arr]);
        } else if (yesterday === curDay) {
          temp.push(arr);
        } else {
          result.push(temp);
          temp = [arr];
          yesterday = curDay;
        }
      });

      // result.forEach((arr) => {
      //   arr.sort(([, [, time1]], [, [, time2]]) => time1 - time2);
      // });
      return result;
    },
  },
  mounted() {
    if (this.$route.path.split('/')[2] === 'shared') {
      this.isSharedPage = true;
    } else {
      this.isSharedPage = false;
    }
  },
  methods: {
    idx(d: [string, number[]][]): number {
      return d?.[0]?.[1]?.[0];
    },
    setCourseDatas(datas: CourseInfo[]) {
      datas
        .some((dataObj: CourseInfo) => {
          const id = `${dataObj?.title?.name?.jp} ${dataObj?.lecturers?.[0]?.name?.jp}`;

          if (this.ids.includes(id)) {
            this.setInitialData(dataObj);
            this.$set(this.courses, id, dataObj);
            return true;
          }
          return false;
        });
    },
    setInitialData(dataObj: CourseInfo) {
      const times = dataObj?.schedule?.times?.jp;
      const id = `${dataObj?.title?.name?.jp} ${dataObj?.lecturers?.[0]?.name?.jp}`;
      const pattern = /([月火水木金土日])曜日([１２３４５６７1234567])時限/;
      let [day, time]: number[] = [100, 100];
      const week = ['月', '火', '水', '木', '金', '土', '日'];

      if (typeof times === 'string') {
        times.split(',').forEach((str) => {
          const arr = pattern.exec(str);

          if (arr) {
            const toHalfWidth = String.fromCharCode(arr[2].charCodeAt(0) - 0xFEE0);
            day = week.indexOf(arr[1]);
            time = Number(toHalfWidth);
          }
        });
      }

      this.sortedIDs.push([id, [day, time]]);
    },
  },
});
</script>

<i18n>
{
  "en": {
    "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Others"]
  },
  "jp": {
    "days": ["月", "火", "水", "木", "金", "土", "その他"]
  }
}
</i18n>
