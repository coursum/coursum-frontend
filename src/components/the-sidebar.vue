<template>
  <v-navigation-drawer v-model="visibility" app color="primary" @input="toggleSideBar">
    <v-list nav dense>
      <the-link-timetable />
    </v-list>
    <template #append>
      <the-app-setting class="mt-auto" />
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import TheAppSetting from '@/components/the-app-setting.vue';
import TheLinkTimetable from '@/components/the-link-timetable.vue';
import injectStrict from '@/util/inject-strict';
import { toggleSideBarKey, visibilityKey } from '@/util/injection-keys';

export default defineComponent({
  name: 'TheSideBar',
  components: {
    TheAppSetting,
    TheLinkTimetable,
  },
  setup: () => {
    const visibility = injectStrict(visibilityKey);
    const toggleSideBar = injectStrict(toggleSideBarKey);

    return {
      visibility,
      toggleSideBar,
    };
  },
});
</script>
