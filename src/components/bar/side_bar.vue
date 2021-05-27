<template>
  <v-navigation-drawer
    :value="sideBarState"
    app
    color="primary"
    @input="changeSideBarState"
  >
    <div
      style="height: 100%"
      class="d-flex flex-column"
    >
      <div>
        <timetable-link />
      </div>
      <div class="mt-auto">
        <setting-show />
      </div>
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
  setup: (_, context) => {
    const sideBarState = computed(() => context.root.$store.state.sideBarState);

    const changeSideBarState = (state: boolean) => {
      context.root.$store.commit('setSideBarState', state);
    };

    return {
      sideBarState,
      changeSideBarState,
    };
  },
});
</script>
