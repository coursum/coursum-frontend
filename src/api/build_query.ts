import store from '@/store';
import router from '@/router';
import { AdvancedInputs } from '@/assets/SearchInfo';

interface QueryParams {
  builder: string | null | undefined | AdvancedInputs;
}

function keywordsToString(keywords: AdvancedInputs): string {
  return [
    ['giga', keywords.giga],
    ['teacher', keywords.teacher],
    ['language', keywords.language],
    ['semester', keywords.semester],
    ['times', keywords.times],
  ]
    .filter(([, value]) => (
      value
        && value !== ''
        && value !== null
        && value !== undefined
    ))
    .map(([key, value]) => `${key}=${value}`).join('&');
}

export default {
  buildQuery(params: QueryParams): string {
    let query = '';
    let keywords = '';

    if (typeof params.builder === 'string') {
      // query検索なのでkeywordsは変えない
      query = params.builder;
      keywords = keywordsToString(store.state.advancedInputs);
    } else if (params.builder !== undefined
      && params.builder !== null) {
      // keywords検索なのでqueryは変えない
      query = store.state.searchInput;
      keywords = keywordsToString(params.builder);
    } else {
      // query検索なのでkeywordsは変えない
      query = '';
      keywords = keywordsToString(store.state.advancedInputs);
    }

    if (query === '' && keywords === '') {
      return 'search?';
    }

    if (query === '') {
      return `search?${keywords}`;
    }

    if (keywords === '') {
      return `search?query=${query}`;
    }

    return `search?query=${query}&${keywords}`;
  },
  goToResultPage(path: string) {
    if (path !== window.location.pathname) {
      router.push({ path });
    }
  },
};
