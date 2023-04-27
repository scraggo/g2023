import useSWR from 'swr';

import { npmSearch } from './requests';
import { Result } from './types';

export function useNPMSearch(searchText: string) {
  return useSWR<Result[]>(`suggestions?q=${searchText}`, npmSearch, {
    shouldRetryOnError: false,
  });
}
