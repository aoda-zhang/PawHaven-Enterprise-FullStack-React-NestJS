import { useQuery } from '@tanstack/react-query';

import { getAnimalDetail } from './request';

export const useFetchAnimalDetail = (id: string) => {
  return useQuery({
    queryKey: ['animalDetail', id],
    queryFn: () => getAnimalDetail(id),
    enabled: !!id,
  });
};

export const useFetchRescueLine = (id: string) => {
  return useQuery({
    queryKey: ['animalDetail', id],
    queryFn: () => getAnimalDetail(id),
    enabled: !!id,
  });
};
