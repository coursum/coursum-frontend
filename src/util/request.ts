import axios from 'axios';

import type { AdvancedQuery } from '@/types/SearchInfo';

interface QueryParams {
  query: string;
  advanced: AdvancedQuery;
}

export default {
  axios: axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
  }),
  buildQuery({ query, advanced }: QueryParams) {
    const params = new URLSearchParams({
      query,
      ...advanced,
    });

    [...params.entries()].forEach(([key, value]) => {
      if (value === '') {
        params.delete(key);
      }
    });

    return params;
  },
};
