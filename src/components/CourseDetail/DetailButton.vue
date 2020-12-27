<template>
  <router-link
    :to="'/course-detail/' + genId"
    class="text-decoration-none"
  >
    <v-btn icon>
      <v-icon small>
        mdi-file-document-outline
      </v-icon>
    </v-btn>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Title, Lecturer } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DetailButton',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    title(): Title {
      return this.$store.state.courseDatas[this.idx].title;
    },
    lecturer(): Lecturer {
      return this.$store.state.courseDatas[this.idx].lecturers[0];
    },
    genId(): string {
      return `${this.title.name.jp} ${this.lecturer.name.jp}`;
    },
  },
});
</script>
