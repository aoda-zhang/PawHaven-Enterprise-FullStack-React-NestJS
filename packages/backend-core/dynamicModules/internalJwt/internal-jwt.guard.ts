import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { httpBusinessMappingCodes } from '@pawhaven/shared';
import { InternalJwtKind, type InternalJwt } from '@pawhaven/shared/types';

import { AuthMetadataKey } from '../../decorators/auth-mode.decorator';

import { InternalJwtVerificationError } from './errors';
import type { InternalJwtRequest } from './internal-jwt.types';
import { verifyInternalJwt, type VerifyInternalJwtOptions } from './verify';

const DEFAULT_TTL_SECONDS = 45;
const DEFAULT_CLOCK_SKEW_SECONDS = 30;

@Injectable()
export class InternalJwtGuard implements CanActivate {
  private readonly verifyOptions: VerifyInternalJwtOptions;

  constructor(
    private readonly reflector: Reflector,
    configService: ConfigService,
  ) {
    const secret = configService.get<string>('internalJwt.secret');
    const trustedKeyIds = configService.get<string[]>(
      'internalJwt.trustedKeyIds',
    );
    if (
      !secret ||
      !Array.isArray(trustedKeyIds) ||
      trustedKeyIds.length === 0
    ) {
      throw new Error(
        'internalJwt.secret and internalJwt.trustedKeyIds must be non-empty',
      );
    }
    const audience =
      configService.get<string>('internalJwt.audience') ??
      configService.get<string>('http.prefix');
    if (!audience) {
      throw new Error('internalJwt.audience must be configured');
    }
    const ttlSeconds =
      configService.get<number>('internalJwt.ttlSeconds') ??
      DEFAULT_TTL_SECONDS;
    const clockSkewSeconds =
      configService.get<number>('internalJwt.clockSkewSeconds') ??
      DEFAULT_CLOCK_SKEW_SECONDS;
    const secretByKeyId: Record<string, string> = {};
    trustedKeyIds.forEach((keyId) => {
      secretByKeyId[keyId] = secret;
    });
    this.verifyOptions = {
      audience,
      trustedKeyIds,
      secretByKeyId,
      ttlSeconds,
      clockSkewSeconds,
    };
  }

  canActivate(context: ExecutionContext): boolean {
    const metadataTargets = [context.getHandler(), context.getClass()];
    const request = context.switchToHttp().getRequest<InternalJwtRequest>();

    let claims: InternalJwt;
    try {
      claims = verifyInternalJwt(request.headers, this.verifyOptions);
    } catch (error) {
      if (error instanceof InternalJwtVerificationError) {
        throw new UnauthorizedException(httpBusinessMappingCodes.unauthorized);
      }
      throw error;
    }
    request.internalJwt = claims;

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      AuthMetadataKey.PUBLIC,
      metadataTargets,
    );
    const isOptionalAuth = this.reflector.getAllAndOverride<boolean>(
      AuthMetadataKey.OPTIONAL,
      metadataTargets,
    );

    if (isPublic || isOptionalAuth) {
      return true;
    }

    if (claims.kind === InternalJwtKind.AUTHENTICATED) {
      return true;
    }

    throw new UnauthorizedException(httpBusinessMappingCodes.unauthorized);
  }
}
