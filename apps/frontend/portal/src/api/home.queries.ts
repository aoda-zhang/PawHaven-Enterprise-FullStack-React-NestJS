import { queryOptions, useQuery } from '@tanstack/react-query';

import { getHomeData } from './home.api';
import { homeQueryKeys } from './home.queryKeys';

export const EMPTY_HERO_STATS = {
  totalRescues: 0,
  totalAdopted: 0,
  totalVolunteers: 0,
};

export const homeQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.content(),
    queryFn: getHomeData,
    staleTime: Infinity,
  });

export const useHomeData = () => {
  return useQuery(homeQueryOptions());
};
