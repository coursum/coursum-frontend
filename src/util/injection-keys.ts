import type { InjectionKey, Ref } from '@vue/composition-api';
import type { Course } from 'coursum-types';

import type { AdvancedQuery } from '@/types/Search';

const visibilityKey: InjectionKey<Ref<boolean>> = Symbol('visibility');
const toggleSideBarKey: InjectionKey<(value: boolean) => void> = Symbol('toggleSideBar');

const isLoadingKey: InjectionKey<Ref<boolean>> = Symbol('isLoading');
const setLoadingStateKey: InjectionKey<(value: boolean) => void> = Symbol('setLoadingState');

const searchInputKey: InjectionKey<Ref<string>> = Symbol('searchInput');
const setSearchInputKey: InjectionKey<(value: string) => void> = Symbol('setSearchInput');

const advancedQueryKey: InjectionKey<Ref<AdvancedQuery>> = Symbol('advancedQuery');
const setAdvancedQueryKey: InjectionKey<(value: AdvancedQuery) => void> = Symbol('setAdvancedQuery');

const timetableCoursesKey: InjectionKey<Ref<Course[]>> = Symbol('timetableCourses');
const setTimetableCoursesKey: InjectionKey<(value: Course[]) => void> = Symbol('setTimetableCourses');

export {
  visibilityKey,
  toggleSideBarKey,

  isLoadingKey,
  setLoadingStateKey,

  searchInputKey,
  setSearchInputKey,

  advancedQueryKey,
  setAdvancedQueryKey,

  timetableCoursesKey,
  setTimetableCoursesKey,
};
