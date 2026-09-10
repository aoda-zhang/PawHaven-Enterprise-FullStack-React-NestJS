import crypto from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { HttpClientService } from '@pawhaven/backend-core';
import {
  cookieKeys,
  httpHeaders,
  microServiceNames,
} from '@pawhaven/backend-core/constants';
import { InternalJwtKind } from '@pawhaven/shared/types';

import { InternalJwtService } from '../internal-jwt/internal-jwt.service';
import { InternalJwtTargetResolver } from '../internal-jwt/internal-jwt-target.resolver';

const REFRESH_PATH = '/auth-service/refresh';

@Injectable()
export class TokenRefresher {
  private readonly refreshInflight = new Map<
    string,
    Promise<string[] | null>
  >();

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly internalJwtService: InternalJwtService,
    private readonly internalJwtTargetResolver: InternalJwtTargetResolver,
  ) {}

  refreshOnce(refreshToken: string): Promise<string[] | null> {
    const inflight = this.refreshInflight.get(refreshToken);
    if (inflight) {
      return inflight;
    }
    const refreshAttempt = this.requestRefresh(refreshToken).catch(() => null);
    this.refreshInflight.set(refreshToken, refreshAttempt);
    refreshAttempt.finally(() => {
      this.refreshInflight.delete(refreshToken);
    });
    return refreshAttempt;
  }

  private async requestRefresh(refreshToken: string): Promise<string[] | null> {
    const authTarget = this.internalJwtTargetResolver.resolve(
      microServiceNames.AUTH,
    );
    const internalJwtHeaders = this.internalJwtService.sign(
      { kind: InternalJwtKind.ANONYMOUS },
      authTarget,
      crypto.randomUUID(),
    );
    const authClient = this.httpClientService.create(microServiceNames.AUTH);
    const response = await authClient.post<unknown>(
      REFRESH_PATH,
      {},
      {
        returnResponse: true,
        headers: {
          [httpHeaders.cookie]: `${cookieKeys.refresh_token}=${refreshToken}`,
          [httpHeaders.gatewayJwt]: internalJwtHeaders[httpHeaders.gatewayJwt],
        },
      },
    );
    const setCookieHeaders = response.headers[httpHeaders.setCookie];
    return Array.isArray(setCookieHeaders) ? setCookieHeaders : null;
  }
}
