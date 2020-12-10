<template>
  <div>
    <v-btn
      v-if="idsInTimetable.includes(generateId)"
      icon
      @click="
        $store.commit('removeFromTimetable', generateId)
      "
    >
      <v-icon
        small
        color="orange"
      >
        mdi-star
      </v-icon>
    </v-btn>
    <v-btn
      v-else
      icon
      @click="$store.commit('addToTimetable', generateId)"
    >
      <v-icon
        small
        color="#929292"
      >
        mdi-star-outline
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Title, Lecturer } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'TButton',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    idsInTimetable(): string[] {
      return this.$store.state.idsInTimetable;
    },
    title(): Title {
      return this.$store.state.courseDatas[this.idx].title;
    },
    lecturer(): Lecturer {
      return this.$store.state.courseDatas[this.idx].lecturers[0];
    },
    generateId(): string {
      return `${this.title.name.jp} ${this.lecturer.name.jp}`;
    },
  },
});
</script>
