export interface AdvancedQuery {
  giga: string;
  teacher: string;
  language: string;
  semester: string;
  times: string;
}

export interface SearchResponse<T> {
  Stat: {
    Total: number;
    Latency: number;
  };
  Hits: T[] | null;
}
