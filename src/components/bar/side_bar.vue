<template>
  <v-navigation-drawer
    :value="sideBarState"
    app
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
import Vue from 'vue';
import SettingShow from '@/components/setting/setting_show.vue';
import TimetableLink from '@/components/timetable/timetable_link.vue';

export default Vue.extend({
  name: 'SideBar',
  components: {
    SettingShow,
    TimetableLink,
  },
  computed: {
    sideBarState() {
      return this.$store.state.sideBarState;
    },
  },
  methods: {
    changeSideBarState(sideBarState: boolean) {
      this.$store.commit('setSideBarState', sideBarState);
    },
  },
});
</script>
