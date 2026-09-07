import type { BootstrapData } from '@pawhaven/shared/types';

import { apiClient } from '@/utils/apiClient';

export const getBootstrapData = async (): Promise<BootstrapData> => {
  return apiClient.get<BootstrapData>('core/bootstrap');
};
