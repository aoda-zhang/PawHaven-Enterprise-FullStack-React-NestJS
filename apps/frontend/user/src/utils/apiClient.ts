import { createApiClient } from '@pawhaven/frontend-core/utils';

import { loadConfig } from '@/config';

/**
 * Create a single shared API client instance for this app.
 * Ensures all API requests share the same configuration.
 */
export const apiClient = createApiClient({
  timeout: loadConfig()?.api?.timeout,
  baseURL: loadConfig()?.api?.baseURL ?? '',
  enableSign: true,
  prefix: loadConfig()?.api?.prefix,
  privateKey: loadConfig()?.api?.privateKey,
});
