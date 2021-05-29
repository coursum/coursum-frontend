<template>
  <div
    v-if="isMdAndUp"
    class="word--text text-center"
    :style="logoStyle"
    @click="goResult"
  >
    Coursum
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import tool from '@/api/build_query';
import request from '@/api/request';

export default defineComponent({
  name: 'CoursumLogo',
  setup: (_, context) => {
    const logoStyle = computed(() => ({ 'font-size': '1.1rem', cursor: 'pointer' }));

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
