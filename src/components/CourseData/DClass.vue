<template>
  <div>
    <div v-if="related">
      {{ related }}
    </div>
    <div v-if="classroom">
      {{ classroom }}
    </div>
    <div v-if="types">
      {{ types }}
    </div>
    <div v-if="tag">
      {{ tag }}
    </div>
    <div v-if="curriculumCode">
      {{ curriculumCode }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tag } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DClass',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    related(): null | undefined {
      return this.$store.state.courseDatas[this.idx].related;
    },
    classroom(): string | null | undefined {
      return this.$store.state.courseDatas[this.idx].classroom;
    },
    types(): null | undefined {
      return this.$store.state.courseDatas[this.idx].types;
    },
    tag(): Tag {
      return this.$store.state.courseDatas[this.idx].tag;
    },
    curriculumCode(): string | null | undefined {
      return this.$store.state.courseDatas[this.idx].curriculumCode;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>
