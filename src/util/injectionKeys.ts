import type { InjectionKey, Ref } from '@vue/composition-api';

import type { AdvancedQuery } from '@/assets/SearchInfo';

const visibilityKey: InjectionKey<Ref<boolean>> = Symbol('visibility');
const toggleSideBarKey: InjectionKey<(value: boolean) => void> = Symbol('toggleSideBar');

const isLoadingKey: InjectionKey<Ref<boolean>> = Symbol('isLoading');
const setLoadingStateKey: InjectionKey<(value: boolean) => void> = Symbol('setLoadingState');

const searchInputKey: InjectionKey<Ref<string>> = Symbol('searchInput');
const setSearchInputKey: InjectionKey<(value: string) => void> = Symbol('setSearchInput');

const advancedQueryKey: InjectionKey<AdvancedQuery> = Symbol('advancedQuery');
const setAdvancedQueryKey: InjectionKey<(value: Partial<AdvancedQuery>) => void> = Symbol('setAdvancedQuery');

export {
  visibilityKey,
  toggleSideBarKey,
  isLoadingKey,
  setLoadingStateKey,
  searchInputKey,
  setSearchInputKey,
  advancedQueryKey,
  setAdvancedQueryKey,
};
