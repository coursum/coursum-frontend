<template>
  <div>
    <course-data />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseData from '@/components/CourseData.vue';

export default Vue.extend({
  name: 'CourseList',

  components: {
    CourseData,
  },

  data: () => ({

  }),

});
</script>
