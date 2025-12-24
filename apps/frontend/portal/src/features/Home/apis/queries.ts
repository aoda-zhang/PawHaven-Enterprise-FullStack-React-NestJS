import { useQuery } from '@tanstack/react-query';

import { getLatestRescuesByNumber } from './requests';

export const useFetchLatestRescuesByNumber = () => {
  return useQuery({
    queryKey: ['latestRescues'],
    queryFn: getLatestRescuesByNumber,
  });
};

export const useFetchLatestStories = () => {
  return useQuery({
    queryKey: ['latestRescues'],
    queryFn: getLatestRescuesByNumber,
  });
};
