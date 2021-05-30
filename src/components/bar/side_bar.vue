<template>
  <v-navigation-drawer app color="primary" :value="isVisible">
    <!-- TODO: remove the inline style here or hind a better layout -->
    <div style="height: 100%" class="d-flex flex-column">
      <v-list nav dense>
        <timetable-link />
      </v-list>
      <setting-show class="mt-auto" />
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import SettingShow from '@/components/setting/setting_show.vue';
import TimetableLink from '@/components/timetable/timetable_link.vue';

export default defineComponent({
  name: 'SideBar',
  components: {
    SettingShow,
    TimetableLink,
  },
  setup: (_, { root: { $store } }) => {
    const isVisible = computed(() => $store.state.sidebar.isVisible);

    return {
      isVisible,
    };
  },
});
</script>
