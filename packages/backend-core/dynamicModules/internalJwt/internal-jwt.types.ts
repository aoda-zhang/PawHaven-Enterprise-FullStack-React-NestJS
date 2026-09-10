import type { Request } from 'express';
import type { InternalJwt } from '@pawhaven/shared/types';

export type InternalJwtRequest = Request & {
  internalJwt?: InternalJwt;
};
