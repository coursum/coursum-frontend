<template>
  <span
    v-if="times"
  >
    <v-chip
      v-for="(display, i) in displays"
      :key="i"
      color="primary"
      outlined
      x-small
    >
      {{ display }}
    </v-chip>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DScheduleTimes',
  props: {
    times: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    displays(): string[] {
      const { times } = this;
      const pattern = /([月火水木金土日])曜日([１２３４５６７1234567])時限/;
      const schedule: string[] = times.split(',').map((str) => {
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
    },
  },

});
</script>
