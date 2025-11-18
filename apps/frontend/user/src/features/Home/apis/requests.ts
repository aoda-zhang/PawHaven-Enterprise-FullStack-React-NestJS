import type { RescueItemType } from '../types';

import { apiClient } from '@/utils/apiClient';

export const getLatestRescuesByNumber = (): Promise<RescueItemType[]> => {
  // return http.get(`/rescues/latest/${number}`);
  const mockdata: RescueItemType[] = [
    {
      animalID: '001',
      name: 'Dense',
      img: 'https://daoinsights.com/wp-content/webp-express/webp-images/uploads/2022/03/anoir-chafik-2_3c4dIFYFU-unsplash-1870x1169.jpg.webp',
      description:
        'A very cute cat with a gentle personality, loves being close to people, suitable for family care.',
      location: 'Shuangliu Tianfu Fifth Street',
      time: '2023-10-20 12:00',
      status: 'pending',
    },
    {
      animalID: '002',
      name: 'Tiger',
      img: 'https://d.newsweek.com/en/full/2050102/stray-cats.jpg?w=1200&f=7d728c9cbd5cd73470c100ff9cd51d59',
      description:
        'A lively and energetic dog, loves outdoor activities, needs a loving family to take care of it.',
      location: 'Paris Fashion District',
      time: '2023-10-20 12:00',
      status: 'treated',
    },
    {
      animalID: '003',
      name: 'Lele',
      img: 'https://media.4-paws.org/1/b/1/4/1b14c5ffc386210e11c20c5dd139b772af045503/VIER%20PFOTEN_2023-10-19_00181-3801x2534-3662x2534-1920x1329.jpg',
      description:
        'A gentle and well-behaved dog, enjoys a quiet environment, suitable for indoor care.',
      location: 'Central, Hong Kong',
      time: '2023-10-20 12:00',
      status: 'awaitingAdoption',
    },
  ];
  return Promise.resolve(mockdata);
};

export const getLatestStories = (): Promise<RescueItemType[]> => {
  return apiClient.get('/rescues/latest');
};
