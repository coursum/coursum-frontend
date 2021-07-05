import axios from 'axios';

import type { AdvancedQuery } from '@/types/Search';

interface QueryParams {
  query: string;
  advanced: AdvancedQuery;
}

const customAxios = axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL });

const buildQuery = ({ query, advanced }: QueryParams) => (
  new URLSearchParams({ query, ...advanced })
);

export {
  customAxios as axios,
  buildQuery,
};
