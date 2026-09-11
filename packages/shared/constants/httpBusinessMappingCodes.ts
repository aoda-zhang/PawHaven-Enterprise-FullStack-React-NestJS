export const httpBusinessMappingCodes = {
  tokenMissing: 'TOKEN_MISSING', // Token not provided
  jwtExpired: 'TOKEN_EXPIRED', // Token has expired
  invalidToken: 'INVALID_TOKEN', // Token is invalid
  invalidSign: 'INVALID_SIGNATURE', // Token signature invalid
  userNotFound: 'USER_NOT_FOUND', // User information not found
  unauthorized: 'UNAUTHORIZED', // User not authenticated
  forbidden: 'PERMISSION_DENIED', // User has no permission
  validationError: 'DATA_VALIDATION_FAILED', // Request validation failed
  invalidCredentials: 'INVALID_CREDENTIALS', // Invalid email or password
  userAlreadyExists: 'EMAIL_ALREADY_EXISTS', // User with email already exists
  invalidRefreshToken: 'INVALID_REFRESH_TOKEN', // Refresh token is invalid or expired
  serverError: 'SERVER_ERROR', // Internal server error
} as const;
