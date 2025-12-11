import { Request } from 'express';

import { HttpReqHeader } from '../types/http.types';

export const getTokenFromHeader = (request: Request) => {
  if (request?.headers?.[HttpReqHeader.accessToken]) {
    return request?.headers?.[HttpReqHeader.accessToken];
  }
  const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};
