<template>
  <div>
    <div v-if="isLoading">
      ロード中
    </div>
    <div v-else>
      {{ courseDatas[0] }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CourseList',

  data: () => ({

  }),
  computed: {
    courseDatas() {
      return this.$store.state.courseDatas;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  async created() {
    this.fetchData('pretty');
  },
  methods: {
    async fetchData(search: string) {
      this.$store.commit('fetchData', search);
    },
  },
});
</script>
