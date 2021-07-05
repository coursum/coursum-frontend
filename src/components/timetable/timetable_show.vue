<template>
  <div class="pa-6">
    <div v-if="isLoading">
      now loading...
    </div>
    <div v-else>
      <course-show v-for="(course, n) in courses" :key="n"
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
/* eslint-disable vue/no-unused-properties */
import {
  computed, defineComponent, onMounted, reactive,
} from '@vue/composition-api';
import type { Course } from 'coursum-types';

import CourseShow from '@/components/course/course_show.vue';
import { injectStrict } from '@/util';
import { isLoadingKey } from '@/util/injectionKeys';

interface State {
  isSharedPage: boolean;
  sortedIDs: [string, number[]][];
}

export default defineComponent({
  name: 'TimetableShow',
  components: {
    CourseShow,
  },
  setup: (_, context) => {
    const { $store } = context.root;

    const state = reactive<State>(
      {
        isSharedPage: false,
        sortedIDs: [['', [0]]],
      },
    );

    const courses = computed((): Course[] => $store.state.timetable.courses);

    const ids = computed((): string[] => $store.state.timetable.ids);

    const isLoading = injectStrict(isLoadingKey);

    const sorted = computed((): [string, number[]][][] => {
      const daySort = state.sortedIDs;
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
    });

    onMounted(() => {
      if (context.root.$route.path.split('/')[2] === 'shared') {
        state.isSharedPage = true;
      } else {
        state.isSharedPage = false;
      }
    });

    const idx = (d: [string, number[]][]): number => d?.[0]?.[1]?.[0];

    const setInitialData = (dataObj: Course) => {
      const times = dataObj?.schedule?.times?.ja;
      const id = `${dataObj?.title?.name?.ja} ${dataObj?.lecturers?.[0]?.name?.ja}`;
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

      state.sortedIDs.push([id, [day, time]]);
    };

    const setCourseDatas = (datas: Course[]) => {
      datas
        .some((dataObj: Course) => {
          const id = `${dataObj?.title?.name?.ja} ${dataObj?.lecturers?.[0]?.name?.ja}`;

          if (ids.value.includes(id)) {
            setInitialData(dataObj);
            context.root.$set(courses, id, dataObj);
            return true;
          }
          return false;
        });
    };

    return {
      isLoading,
      courses,
      sorted,
      idx,
      setCourseDatas,
    };
  },

});
</script>

<i18n>
{
  "en": {
    "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Others"]
  },
  "ja": {
    "days": ["月", "火", "水", "木", "金", "土", "その他"]
  }
}
</i18n>
