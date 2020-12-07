<template>
  <div
    v-if="courseDatas[idx].title
      && courseDatas[idx].title.name
      && courseDatas[idx].title.name.en"
  >
    <router-link
      :to="'/course-detail/' + courseDatas[idx].title.name.en"
      class="text-decoration-none"
    >
      <v-btn icon>
        <v-icon small>
          mdi-file-document-outline
        </v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DetailButton',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    courseDatas(): CourseInfo[] {
      return this.$store.state.courseDatas;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
