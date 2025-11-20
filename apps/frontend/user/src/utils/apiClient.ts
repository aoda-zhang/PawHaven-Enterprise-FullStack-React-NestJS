import { createApiClient } from '@pawhaven/frontend-core/api';

import { loadConfig } from '@/config';

/**
 * Create a single shared API client instance for this app.
 * Ensures all API requests share the same configuration.
 */
export const apiClient = createApiClient({
  timeout: loadConfig()?.http?.timeout,
  baseURL: loadConfig()?.http?.baseURL ?? '',
  enableSign: true,
  prefix: loadConfig()?.http?.prefix,
  privateKey: loadConfig()?.http?.privateKey,
});
