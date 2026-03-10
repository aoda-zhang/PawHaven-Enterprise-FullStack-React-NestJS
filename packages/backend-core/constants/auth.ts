export const AUTH_PUBLIC_PATHS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/core/app/bootstrap',
];

export const cookieKeys = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
} as const;
