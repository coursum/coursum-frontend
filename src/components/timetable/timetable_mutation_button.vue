<template>
  <span>
    <v-btn
      v-if="isInclude"
      icon
      color="#ffc91a"
      @click.prevent="$store.commit('timetable/removeFromTimetable', id)"
    >
      <v-icon> mdi-star </v-icon>
    </v-btn>

    <v-btn
      v-else
      icon
      color="#ffc91a"
      @click.prevent="$store.commit('timetable/addToTimetable', id)"
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
