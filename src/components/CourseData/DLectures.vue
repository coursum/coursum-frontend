<template>
  <div
    v-if="lecturers && 0 < lecturers.length"
    style="line-height: 17px"
    :class="{'text-truncate': textTruncate}"
  >
    <span
      v-for="(lecturer, i) in lecturers"
      :key="i"
    >
      <span
        v-if="lecturer.name && lecturer.name[`${curLang}`]"
        class="secondary--text"
      >
        {{ lecturer.name[`${curLang}`] }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DLectures',
  props: {
    lecturers: {
      type: Array,
      default() {
        return undefined;
      },
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>

<style scoped>
span {
  font-size: 13px;
  font-weight: bold;
}
</style>
