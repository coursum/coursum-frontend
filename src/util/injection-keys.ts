import type { InjectionKey, Ref } from '@vue/composition-api';
import type { CourseV2 } from 'coursum-types';

import type { AdvancedQuery } from '@/types/Search';

const visibilityKey: InjectionKey<Ref<boolean>> = Symbol('visibility');
const toggleSideBarKey: InjectionKey<(value: boolean) => void> = Symbol('toggleSideBar');

const searchInputKey: InjectionKey<Ref<string>> = Symbol('searchInput');
const setSearchInputKey: InjectionKey<(value: string) => void> = Symbol('setSearchInput');

const advancedQueryKey: InjectionKey<Ref<AdvancedQuery>> = Symbol('advancedQuery');
const setAdvancedQueryKey: InjectionKey<(value: AdvancedQuery) => void> = Symbol('setAdvancedQuery');

const timetableCoursesKey: InjectionKey<Ref<CourseV2[]>> = Symbol('timetableCourses');
const setTimetableCoursesKey: InjectionKey<(value: CourseV2[]) => void> = Symbol('setTimetableCourses');

export {
  visibilityKey,
  toggleSideBarKey,

  searchInputKey,
  setSearchInputKey,

  advancedQueryKey,
  setAdvancedQueryKey,

  timetableCoursesKey,
  setTimetableCoursesKey,
};
