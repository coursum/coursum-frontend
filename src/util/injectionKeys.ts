import type { InjectionKey, Ref } from '@vue/composition-api';

import type { AdvancedInputs } from '@/assets/SearchInfo';

const visibilityKey: InjectionKey<Ref<boolean>> = Symbol('visibility');
const toggleSideBarKey: InjectionKey<(value: boolean) => void> = Symbol('toggleSideBar');

const isLoadingKey: InjectionKey<Ref<boolean>> = Symbol('isLoading');
const setLoadingStateKey: InjectionKey<(value: boolean) => void> = Symbol('setLoadingState');

const searchInputKey: InjectionKey<Ref<string>> = Symbol('searchInput');
const setSearchInputKey: InjectionKey<(value: string) => void> = Symbol('setSearchInput');

const advancedInputsKey: InjectionKey<AdvancedInputs> = Symbol('advancedInputs');
const setAdvancedInputsKey: InjectionKey<(value: AdvancedInputs) => void> = Symbol('setAdvancedInputs');

export {
  visibilityKey,
  toggleSideBarKey,
  isLoadingKey,
  setLoadingStateKey,
  searchInputKey,
  setSearchInputKey,
  advancedInputsKey,
  setAdvancedInputsKey,
};
