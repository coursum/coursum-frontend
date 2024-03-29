<template>
  <v-app>
    <the-topbar />
    <the-sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import type { SetupContext } from '@vue/composition-api';
import { defineComponent, provide, ref } from '@vue/composition-api';
import type { CourseV2 } from 'coursum-types';

import TheSidebar from '@/components/the-sidebar.vue';
import TheTopbar from '@/components/the-topbar.vue';
import {
  setTimetableCoursesKey,
  timetableCoursesKey,
  toggleSideBarKey,
  visibilityKey,
} from '@/util/injection-keys';
import useStorage from '@/util/use-storage';

const useConfigInStorage = (context: SetupContext) => {
  const { $vuetify, $i18n } = context.root;
  const { getItem } = useStorage(localStorage);

  $vuetify.theme.dark = getItem('vuetify.theme.dark') || $vuetify.theme.dark;
  $i18n.locale = getItem('i18n.locale') || $i18n.locale;
};

const useToggleSideBar = () => {
  const visibility = ref(false);
  const toggleSideBar = (value: boolean) => {
    visibility.value = value;
  };

  provide(visibilityKey, visibility);
  provide(toggleSideBarKey, toggleSideBar);

  return {
    visibility,
  };
};

const useTimetable = () => {
  const { getItem, setItem } = useStorage(localStorage);
  const courses: CourseV2[] = getItem('timetable/courses') || [];

  const timetableCourses = ref(courses);
  const setTimetableCourses = (value: CourseV2[]) => {
    timetableCourses.value = value;
    setItem('timetable/courses', value);
  };

  provide(timetableCoursesKey, timetableCourses);
  provide(setTimetableCoursesKey, setTimetableCourses);

  return {
    timetableCourses,
  };
};

export default defineComponent({
  name: 'App',
  components: {
    TheSidebar,
    TheTopbar,
  },
  setup: (_, context) => {
    useConfigInStorage(context);

    return {
      ...useToggleSideBar(),
      ...useTimetable(),
    };
  },
});
</script>
