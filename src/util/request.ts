import axios from 'axios';
import type { Course, SearchResponse } from 'coursum-types';
import qs from 'qs';
import type { Route } from 'vue-router';

import type { AdvancedQuery } from '@/types/Search';

interface QueryParams {
  query: string;
  advanced: AdvancedQuery;
}

const customAxios = axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL });

const buildQuery = ({ query, advanced }: QueryParams) => (
  new URLSearchParams({ query, ...advanced })
);

const fetch = async (query: Route['query']) => {
  const querystring = qs.stringify(query);
  const response = await customAxios.get<SearchResponse<Course>>(`/search?${querystring}`);

  return response.data;
};

export {
  buildQuery,
  fetch,
};
