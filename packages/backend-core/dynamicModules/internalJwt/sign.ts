import { sign } from 'jsonwebtoken';
import type { InternalJwt } from '@pawhaven/shared/types';

import { httpHeaders } from '../../constants/httpHeaders';

export type InternalJwtHeaders = {
  [httpHeaders.gatewayJwt]: string;
};

export const signInternalJwt = (
  claims: InternalJwt,
  secret: string,
  keyId: string,
): InternalJwtHeaders => ({
  [httpHeaders.gatewayJwt]: sign(claims, secret, {
    algorithm: 'HS256',
    keyid: keyId,
  }),
});
