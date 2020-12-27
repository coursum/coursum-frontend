<template>
  <v-list
    width="200"
    class="text-center"
    nav
  >
    <v-list-item
      v-if="isInclude"
      @click.stop="
        $store.commit('removeFromTimetable', id)
      "
    >
      <v-list-item-title>
        {{ $t("remove") }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item
      v-else
      @click.stop="
        $store.commit('addToTimetable', id)
      "
    >
      <v-list-item-title>
        {{ $t("add") }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TButton',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    idsInTimetable(): string[] {
      return this.$store.state.idsInTimetable;
    },
    isInclude(): boolean {
      const b = this.idsInTimetable.some((str) => str === this.id);
      return b;
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
