export const httpBusinessMappingCodes = {
  tokenMissing: 'E4000', // Token not provided
  jwtExpired: 'E4001', // Token has expired
  invalidToken: 'E4002', // Token is invalid
  invalidSign: 'E4003', // Token signature invalid
  userNotFound: 'E4004', // User information not found
  unauthorized: 'E4005', // User not authenticated
  forbidden: 'E4006', // User has no permission
  validationError: 'E4007', // Request validation failed
  serverError: 'E5000', // Internal server error
} as const;
