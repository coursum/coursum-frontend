import axios from 'axios';

import type { AdvancedInputs } from '@/assets/SearchInfo';

interface QueryParams {
  query: string;
  advanced: AdvancedInputs;
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
