<template>
  <v-navigation-drawer v-model="visibility" app color="primary" @input="toggleSideBar">
    <v-list nav dense>
      <timetable-link />
    </v-list>
    <template v-slot:append>
      <setting-show class="mt-auto" />
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import SettingShow from '@/components/setting/setting_show.vue';
import TimetableLink from '@/components/timetable/timetable_link.vue';
import { injectStrict } from '@/util';
import { toggleSideBarKey, visibilityKey } from '@/util/injectionKeys';

export default defineComponent({
  name: 'SideBar',
  components: {
    SettingShow,
    TimetableLink,
  },
  setup() {
    const visibility = injectStrict(visibilityKey);
    const toggleSideBar = injectStrict(toggleSideBarKey);

    return {
      visibility,
      toggleSideBar,
    };
  },
});
</script>
