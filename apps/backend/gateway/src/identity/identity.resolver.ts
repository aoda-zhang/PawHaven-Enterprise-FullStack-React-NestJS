import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  authRouteSuffixes,
  cookieKeys,
} from '@pawhaven/backend-core/constants';
import type { Request, Response } from 'express';
import { InternalJwtKind, type JwtVerifyInfo } from '@pawhaven/shared/types';

import type { InternalJwtIdentity } from '../internal-jwt/internal-jwt.types';

import { AccessTokenVerifier } from './access-token.verifier';
import { AuthCookies } from './auth-cookies';
import { ExpiryPolicy } from './expiry-policy';
import { TokenDenylist } from './token-denylist';
import { TokenRefresher } from './token-refresher';

const SESSION_EXPIRED_MESSAGE = 'Session expired, please login again';

@Injectable()
export class IdentityResolver {
  constructor(
    private readonly accessTokenVerifier: AccessTokenVerifier,
    private readonly expiryPolicy: ExpiryPolicy,
    private readonly tokenRefresher: TokenRefresher,
    private readonly authCookies: AuthCookies,
    @Inject(TokenDenylist) private readonly denylist: TokenDenylist,
  ) {}

  async resolve(
    req: Request,
    res: Response,
    path: string,
  ): Promise<InternalJwtIdentity> {
    const accessToken = req.cookies?.[cookieKeys.access_token];
    const refreshToken = req.cookies?.[cookieKeys.refresh_token];

    if (!accessToken && !refreshToken) {
      return { kind: InternalJwtKind.ANONYMOUS };
    }

    const accessPayload = accessToken
      ? this.accessTokenVerifier.verify(accessToken)
      : null;

    if (accessPayload && this.isSessionValid(accessPayload)) {
      if (this.isLogoutPath(path)) {
        if (accessPayload.jti && accessPayload.exp) {
          this.denylist.deny(accessPayload.jti, accessPayload.exp);
        }
        return this.identityFromPayload(accessPayload);
      }

      if (refreshToken && this.expiryPolicy.shouldRefreshSoon(accessPayload)) {
        await this.adoptRefreshedCookies(req, res, refreshToken);
      }

      const currentToken =
        req.cookies?.[cookieKeys.access_token] ?? accessToken;
      const currentPayload = this.accessTokenVerifier.verify(currentToken);
      if (
        currentPayload &&
        !this.expiryPolicy.isSessionExpired(currentPayload)
      ) {
        return this.identityFromPayload(currentPayload);
      }

      return this.identityFromPayload(accessPayload);
    }

    if (refreshToken) {
      const refreshed = await this.adoptRefreshedCookies(
        req,
        res,
        refreshToken,
      );
      if (refreshed) {
        const refreshedPayload = this.accessTokenVerifier.verify(
          req.cookies?.[cookieKeys.access_token],
        );
        if (refreshedPayload && this.isSessionValid(refreshedPayload)) {
          return this.identityFromPayload(refreshedPayload);
        }
      }
    }

    this.authCookies.clear(req, res);
    throw new UnauthorizedException(SESSION_EXPIRED_MESSAGE);
  }

  private async adoptRefreshedCookies(
    req: Request,
    res: Response,
    refreshToken: string,
  ): Promise<boolean> {
    const setCookieHeaders =
      await this.tokenRefresher.refreshOnce(refreshToken);
    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      return false;
    }
    this.authCookies.apply(req, res, setCookieHeaders);
    return true;
  }

  private identityFromPayload(payload: JwtVerifyInfo): InternalJwtIdentity {
    return {
      kind: InternalJwtKind.AUTHENTICATED,
      sub: payload.userId,
      email: payload.email,
      roles: payload.roles,
    };
  }

  private isLogoutPath(path: string): boolean {
    return path.endsWith(authRouteSuffixes.logout);
  }

  private isSessionValid(payload: JwtVerifyInfo): boolean {
    return (
      !this.denylist.isDenied(payload.jti) &&
      !this.expiryPolicy.isSessionExpired(payload)
    );
  }
}
