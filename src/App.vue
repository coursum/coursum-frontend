<template>
  <v-app>
    <top-bar />
    <side-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import type { SetupContext } from '@vue/composition-api';
import { defineComponent, provide, ref } from '@vue/composition-api';
import type { Course } from 'coursum-types';

import SideBar from '@/components/bar/side_bar.vue';
import TopBar from '@/components/bar/top_bar.vue';
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
  const courses: Course[] = getItem('timetable/courses') || [];

  const timetableCourses = ref(courses);
  const setTimetableCourses = (value: Course[]) => {
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
    SideBar,
    TopBar,
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
