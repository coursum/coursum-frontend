import type { InjectionKey } from '@vue/composition-api';
import { inject } from '@vue/composition-api';

function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`);
  }

  return resolved;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  injectStrict,
};
