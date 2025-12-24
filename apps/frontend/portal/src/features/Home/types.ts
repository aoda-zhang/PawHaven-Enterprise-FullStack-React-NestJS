import type { RescueStatus } from '@/constants/RescueStatus';

export type RescueStatusType = (typeof RescueStatus)[keyof typeof RescueStatus];

export interface RescueItemType {
  animalID: string;
  name: string;
  img: string;
  description: string;
  location: string;
  time: string;
  status: RescueStatusType;
}

export type ColorPrefix = 'text' | 'bg' | 'border';
export type StatusColorType = `${ColorPrefix}-rescue-${RescueStatusType}`;
