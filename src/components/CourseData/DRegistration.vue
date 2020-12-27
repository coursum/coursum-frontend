<template>
  <div v-if="registration">
    <div v-if="number">
      {{ number }}
    </div>
    <div v-if="suggestion">
      {{ suggestion }}
    </div>
    <div v-if="requirement">
      {{ requirement }}
    </div>
    <div v-if="prerequisite">
      {{ prerequisite }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Basic } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DRegistration',
  props: {
    registration: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    number(): null | undefined {
      return this.registration?.number;
    },
    suggestion(): Basic {
      return this.registration?.suggestion?.[`${this.curLang}`];
    },
    requirement(): Basic {
      return this.registration?.requirement?.[`${this.curLang}`];
    },
    prerequisite(): null | undefined {
      return this.registration?.prerequisite?.[`${this.curLang}`];
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>
