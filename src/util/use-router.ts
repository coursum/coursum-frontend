/* eslint-disable import/no-duplicates */
// Solve typescript error
// A type-only import can specify a default import or named bindings, but not both. ts(1363)
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
import type VueRouter from 'vue-router';
import type { RawLocation } from 'vue-router';

const useRouter = (router: VueRouter) => {
  const routerPush = async (location: RawLocation) => {
    try {
      await router.push(location);
    } catch (error) {
      if (error.name !== 'NavigationDuplicated') throw error;
    }
  };

  return {
    routerPush,
  };
};

export default useRouter;
