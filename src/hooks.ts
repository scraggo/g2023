import useSWR from 'swr';

import { npmSearch } from './requests';

export function useNPMSearch(searchText: string) {
  return useSWR(`suggestions?q=${searchText}`, npmSearch);
}
