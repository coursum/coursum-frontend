import axios from 'axios';

import type { AdvancedQuery } from '@/types/Search';

interface QueryParams {
  query: string;
  advanced: AdvancedQuery;
}

const customAxios = axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL });

const buildQuery = ({ query, advanced }: QueryParams) => {
  const params = new URLSearchParams({ query, ...advanced });

  [...params.entries()].forEach(([key, value]) => {
    if (value === '') params.delete(key);
  });

  return params;
};

export {
  customAxios as axios,
  buildQuery,
};
