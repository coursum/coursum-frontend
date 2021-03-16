<template>
  <span>
    <v-btn
      v-if="isInclude"
      icon
      x-small
      color="#FFE082"
      @click.prevent="removeCourse()"
    >
      <v-icon> mdi-star </v-icon>
    </v-btn>

    <v-btn
      v-else
      icon
      x-small
      color="#CFD8DC"
      @click.prevent="addCourse()"
    >
      <v-icon> mdi-star-outline </v-icon>
    </v-btn>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TimetableMutationButton',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    isInclude(): boolean {
      const courseIds = this.$store.state.timetable.ids;

      return courseIds.includes(this.id);
    },
  },
  methods: {
    removeCourse() {
      // this.$store.commit('timetable/removeFromTimetable', this.id);
      // setTimeout(() => {
      //   if (this.$route.path.startsWith('/timetable')) {
      //     this.$router.go(this.$router.currentRoute);
      //   }
      // }, 1000);
    },
    addCourse() {
      this.$store.commit('timetable/addToTimetable', this.id);
    },
  },

});
</script>

<i18n>
{
  "en": {
    "add": "add to time table",
    "remove": "remove from time table"
  },
  "jp": {
    "add": "時間割に追加",
    "remove": "時間割から外す"
  }
}
</i18n>
