export const httpRequestErrors = {
  // Authentication
  AUTH: 'AUTH',
  PERMISSION: 'PERMISSION',
  // Client
  RATELIMIT: 'RATELIMIT',
  BADREQUEST: 'BADREQUEST',
  // Server
  SERVER: 'SERVER',
  MAINTENANCE: 'MAINTENANCE',
  UNKNOWN: 'UNKNOWN',
  // Network
  NETWORK: 'NETWORK',
} as const;

export interface ApiClientOptions {
  baseURL: string; // The base URL for API requests
  timeout?: number; // Optional request timeout
  enableSign?: boolean; // Whether to use signature validation
  prefix: string; // endpoint prefix
  privateKey: string; // HMA key
  withCredentials?: boolean; // Is send cookies to backend automatically
}

export type HttpRequestErrorType =
  (typeof httpRequestErrors)[keyof typeof httpRequestErrors];
export interface ApiErrorInfo {
  type: HttpRequestErrorType;
  status?: number;
  data?: Record<string, unknown>;
  raw?: unknown;
  code: string;
}

export interface ApiResponseType {
  type?: HttpRequestErrorType;
  data: unknown;
  isSuccess: boolean;
  message: string;
  status: number;
  code: string;
}
export enum extraRequestHeader {
  'access-token' = 'access-token',
  refreshToken = 'refreshToken',
}
export enum HttpBusinessMappingCode {
  jwtExpired = 'E401',
  unauthorized = 'Unauthorized',
  maintenance = 'Maintenance',
}
