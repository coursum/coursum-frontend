<template>
  <div v-if="registration">
    <div v-if="registration.suggestion">
      {{ registration.suggestion }}
    </div>
    <div v-if="registration.requirement">
      {{ registration.requirement }}
    </div>
    <div v-if="registration.prerequisite">
      {{ registration.prerequisite }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Registration } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DRegistration',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    registration(): Registration {
      return this.$store.state.courseDatas[this.idx].registration;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>
