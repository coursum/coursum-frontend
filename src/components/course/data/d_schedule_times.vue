<template>
  <span v-if="displays">
    <v-chip
      v-for="(display, i) in displays"
      :key="i"
      outlined
      x-small
      color="caption"
    >
      {{ display }}
    </v-chip>
  </span>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';

import { Basic, basicTemplate } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DScheduleTimes',
  props: {
    times: {
      type: Object as PropType<Basic>,
      default: basicTemplate,
    },
  },
  setup: (props) => {
    const displays = computed((): string[] | undefined => {
      const times = props.times.jp;
      if (times) {
        const pattern = /([月火水木金土日])曜日([１２３４５６７1234567])時限/;
        const schedule: string[] = times.split(',').map((str: string) => {
          const arr = pattern.exec(str);
          let [day, time]: [string, number] = ['', -1];

          if (arr) {
            const toHalfWidth = String.fromCharCode(arr[2].charCodeAt(0) - 0xFEE0);
            [, day] = arr;
            time = Number(toHalfWidth);
          }

          return day + time;
        });

        return schedule;
      }
      return undefined;
    });

    return {
      displays,
    };
  },
});
</script>
