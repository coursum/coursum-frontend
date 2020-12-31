<template>
  <div
    v-if="summary"
    :class="{summary: textTruncate}"
    class="primary--text"
    style="font-size: 13.5px; line-height: 1.35;"
  >
    <p
      v-if="showEn"
      class="my-0"
    >
      {{ en }}
    </p>
    <p
      v-else
      class="my-0"
    >
      {{ summary }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DSummary',
  props: {
    summary: {
      type: String,
      default: undefined,
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    en: {
      type: String,
      default: '',
    },
  },
  computed: {
    showEn() {
      if (this.title === '研究会Ａ' || this.title === '研究会Ｂ') {
        return true;
      }
      return false;
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

.summary p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
