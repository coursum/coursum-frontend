<template>
  <div
    v-if="isMdAndUp"
    class="primary--text text-center"
    :style="logoStyle"
    @click="goResult"
  >
    Coursum
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import request from '@/api/request';
import tool from '@/api/build_query';

export default defineComponent({
  name: 'CoursumLogo',
  setup: (_, context) => {
    const logoStyle = computed((): object => ({ 'font-size': '1.1rem', cursor: 'pointer' }));

    const isMdAndUp = computed(() => context.root.$vuetify.breakpoint.mdAndUp);

    const goResult = async () => {
      await request.fetchAndStoreCourses('search?');

      tool.goToResultPage('/');
    };

    return {
      logoStyle,
      isMdAndUp,
      goResult,
    };
  },
});
</script>
