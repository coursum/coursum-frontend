<template>
  <div
    v-if="
      courseDatas[idx].title &&
        courseDatas[idx].title.name &&
        courseDatas[idx].title.name.en
    "
  >
    <v-btn
      v-if="idsInTimetable.includes(courseDatas[idx].title.name.en)"
      icon
      @click="
        $store.commit('removeFromTimetable', courseDatas[idx].title.name.en)
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
      @click="$store.commit('addToTimetable', courseDatas[idx].title.name.en)"
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
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'TButton',
  props: { idx: Number },

  computed: {
    idsInTimetable(): string[] {
      return this.$store.state.idsInTimetable;
    },
    courseDatas(): CourseInfo[] {
      return this.$store.state.courseDatas;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
