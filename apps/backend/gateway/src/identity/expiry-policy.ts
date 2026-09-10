import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JwtVerifyInfo } from '@pawhaven/shared/types';

const MS_PER_SECOND = 1000;
const MINIMUM_REFRESH_WINDOW_SECONDS = 1;

@Injectable()
export class ExpiryPolicy {
  private readonly clockToleranceSeconds: number;

  private readonly refreshFallbackSeconds: number;

  private readonly refreshWindowPercentage: number;

  constructor(configService: ConfigService) {
    this.clockToleranceSeconds = configService.getOrThrow<number>(
      'auth.jwtClockTolerance',
    );
    this.refreshFallbackSeconds = configService.getOrThrow<number>(
      'auth.jwtRefreshFallbackSeconds',
    );
    this.refreshWindowPercentage = configService.getOrThrow<number>(
      'auth.jwtRefreshWindowPercentage',
    );
  }

  shouldRefreshSoon(payload: JwtVerifyInfo): boolean {
    if (!payload.exp) {
      return false;
    }
    const remainingSeconds = payload.exp - ExpiryPolicy.nowInSeconds();
    return remainingSeconds <= this.getRefreshWindowSeconds(payload);
  }

  isSessionExpired(payload: JwtVerifyInfo): boolean {
    if (typeof payload.sessionExpiresAt !== 'number') {
      return false;
    }
    return (
      payload.sessionExpiresAt - this.clockToleranceSeconds <=
      ExpiryPolicy.nowInSeconds()
    );
  }

  private getRefreshWindowSeconds(payload: JwtVerifyInfo): number {
    const fallbackSeconds = Math.floor(this.refreshFallbackSeconds);
    if (!payload.iat || !payload.exp) {
      return fallbackSeconds;
    }
    const tokenLifetimeSeconds = payload.exp - payload.iat;
    if (tokenLifetimeSeconds <= 0) {
      return fallbackSeconds;
    }
    return Math.max(
      MINIMUM_REFRESH_WINDOW_SECONDS,
      Math.floor(tokenLifetimeSeconds * this.refreshWindowPercentage),
    );
  }

  private static nowInSeconds(): number {
    return Math.floor(Date.now() / MS_PER_SECOND);
  }
}
