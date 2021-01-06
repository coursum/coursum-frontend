<template>
  <div class="pa-6">
    <div v-if="isLoading">
      now loading...
    </div>
    <div v-else>
      <div
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
            :course-data="courseDatas[t[0]]"
            :show-summary="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo, courseTemplate } from '@/assets/CourseInfo';
import CourseShow from '@/components/course/course_show.vue';
import request from '../api/request';

export default Vue.extend({

  name: 'TimetableShow',

  components: {
    CourseShow,
  },

  data() {
    return {
      isLoading: true,
      isSharedPage: false,
      courseDatas: [courseTemplate],
      sortedIDs: [] as [string, number[]][],
    };
  },
  computed: {
    idsInTimetable(): string[] {
      return this.$store.state.idsInTimetable;
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

  async created() {
    this.isLoading = true;
    try {
      this.idsInTimetable.forEach((str: string) => {
        this.fetchData(str);
      });
    } finally {
      this.isLoading = false;
    }
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
    async fetchData(query: string) {
      let datas: CourseInfo[] = [];

      const config = {
        query,
      };

      try {
        datas = await request.fetchData(config);
      } finally {
        this.setCourseDatas(datas);
      }
    },
    setCourseDatas(datas: CourseInfo[]) {
      datas
        .some((dataObj: CourseInfo) => {
          const id = `${dataObj?.title?.name?.jp} ${dataObj?.lecturers?.[0]?.name?.jp}`;

          if (this.idsInTimetable.includes(id)) {
            this.setInitialData(dataObj);
            this.$set(this.courseDatas, id, dataObj);
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
