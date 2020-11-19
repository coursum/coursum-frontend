<template>
  <div>
    <div v-if="isLoading">
      ロード中
    </div>
    <div v-else>
      {{ courseDatas }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',

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
  created() {
    this.fetchData('pretty');
  },
  methods: {
    fetchData(search: string) {
      this.$store.commit('fetchData', search);
    },
  },
});
</script>
