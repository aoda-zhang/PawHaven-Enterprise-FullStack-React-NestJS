import type {
  ColorPrefix,
  RescueStatusType,
  StatusColorType,
} from '@/features/Home/types';

interface GetStatusColorParams {
  status: RescueStatusType;
  prefix: ColorPrefix;
}

const bgStatusColors: Record<RescueStatusType, StatusColorType> = {
  pending: 'bg-rescue-pending',
  inProgress: 'bg-rescue-inProgress',
  treated: 'bg-rescue-treated',
  recovering: 'bg-rescue-recovering',
  awaitingAdoption: 'bg-rescue-awaitingAdoption',
  adopted: 'bg-rescue-adopted',
  failed: 'bg-rescue-failed',
};

const textStatusColors: Record<RescueStatusType, StatusColorType> = {
  pending: 'text-rescue-pending',
  inProgress: 'text-rescue-inProgress',
  treated: 'text-rescue-treated',
  recovering: 'text-rescue-recovering',
  awaitingAdoption: 'text-rescue-awaitingAdoption',
  adopted: 'text-rescue-adopted',
  failed: 'text-rescue-failed',
};

const borderStatusColors: Record<RescueStatusType, StatusColorType> = {
  pending: 'border-rescue-pending',
  inProgress: 'border-rescue-inProgress',
  treated: 'border-rescue-treated',
  recovering: 'border-rescue-recovering',
  awaitingAdoption: 'border-rescue-awaitingAdoption',
  adopted: 'border-rescue-adopted',
  failed: 'border-rescue-failed',
};

export const getStatusColorByPrefix = ({
  status,
  prefix,
}: GetStatusColorParams): StatusColorType => {
  switch (prefix) {
    case 'bg':
      return bgStatusColors[status];
    case 'text':
      return textStatusColors[status];
    case 'border':
      return borderStatusColors[status];
    default:
      throw new Error(`Unsupported prefix: ${prefix}`);
  }
};
