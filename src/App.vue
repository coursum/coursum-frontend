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
import {
  defineComponent, onBeforeMount, onMounted, provide, ref,
} from '@vue/composition-api';

import SideBar from '@/components/bar/side_bar.vue';
import TopBar from '@/components/bar/top_bar.vue';
import type { CourseInfo, ValidIdParams } from '@/types/CourseInfo';
import type { SearchResponse } from '@/types/Search';
import {
  isLoadingKey, setLoadingStateKey, toggleSideBarKey, visibilityKey,
} from '@/util/injectionKeys';
import request from '@/util/request';
import useStorage from '@/util/useStorage';

const useToggleSideBar = () => {
  const visibility = ref(false);
  const toggleSideBar = (value: boolean) => {
    visibility.value = value;
  };

  provide(visibilityKey, visibility);
  provide(toggleSideBarKey, toggleSideBar);

  return {
    toggleSideBarKey,
  };
};

const useLoading = () => {
  const isLoading = ref(false);
  const setLoadingState = (value: boolean) => {
    isLoading.value = value;
  };

  provide(isLoadingKey, isLoading);
  provide(setLoadingStateKey, setLoadingState);

  return {
    setLoadingState,
  };
};

const useConfigInStorage = (context: SetupContext) => {
  const { $vuetify, $i18n } = context.root;

  const { getItem } = useStorage(localStorage);

  onBeforeMount(() => {
    $vuetify.theme.dark = getItem('vuetify.theme.dark') || $vuetify.theme.dark;
    $i18n.locale = getItem('i18n.locale') || $i18n.locale;
  });
};

const useTimetable = (context: SetupContext, setLoadingState: (value: boolean) => void) => {
  const { $store } = context.root;
  const { getItem } = useStorage(localStorage);

  onMounted(async () => {
    // TODO: better naming
    const idObjs: ValidIdParams[] = getItem('timetable/ids') || [];

    const fetchAndStoreCourseForTimetable = async (idObj: ValidIdParams) => {
      try {
        const searchQuery = new URLSearchParams({
          query: idObj.title,
          teacher: idObj.teacher,
        });
        const querystring = searchQuery.toString();
        const response = await request.axios.get<SearchResponse<CourseInfo>>(`/search?${querystring}`);
        const courseHits = response.data.Hits;

        if (courseHits) {
          const course = courseHits[0];

          $store.commit('timetable/addCourse', course);
        }
      } catch (e) {
        console.error(e.message);
      }
    };

    try {
      setLoadingState(true);

      await Promise.all(idObjs.map(fetchAndStoreCourseForTimetable));
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoadingState(false);
    }
  });
};

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    TopBar,
  },
  setup: (_, context) => {
    useToggleSideBar();

    const { setLoadingState } = useLoading();

    useConfigInStorage(context);
    useTimetable(context, setLoadingState);
  },
});
</script>
