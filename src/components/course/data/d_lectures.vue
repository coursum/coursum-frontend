<template>
  <div
    v-if="lecturers && 0 < lecturers.length"
    :class="{'text-truncate': textTruncate}"
    class="px-6"
  >
    <template
      v-for="(lecturer, i) in lecturers"
    >
      <span
        v-if="lecturer.name && lecturer.name[`${curLang}`]"
        :key="i"
        style="display:inline-block;"
        class="mr-2"
      >
        {{ lecturer.name[`${curLang}`] }}
      </span>
    </template>
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
span{
  font-size: 0.85rem;
  color: var(--v-wordcolor-base);
}
</style>
