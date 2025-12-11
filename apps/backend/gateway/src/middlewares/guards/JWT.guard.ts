import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Reflector } from '@nestjs/core';
import type { JwtService } from '@nestjs/jwt';
import {
  httpBusinessMappingCodes,
  HttpReqHeader,
} from '@pawhaven/backend-core';

import { decoratorsKeys } from '../decorators/decorator.constant';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.[HttpReqHeader.accessToken];
    const isNoTokenReq = this.reflector.getAllAndOverride<boolean>(
      decoratorsKeys.noToken,
      [context.getHandler(), context.getClass()],
    );

    try {
      const valid = await this.verifyToken(isNoTokenReq, token);
      return valid;
    } catch (error) {
      throw new BadRequestException(
        error,
        httpBusinessMappingCodes.unauthorized,
      );
    }
  }

  private async verifyToken(
    isNoTokenDecorator: boolean,
    token: string,
  ): Promise<boolean> {
    if (isNoTokenDecorator) return true;
    if (!token) return false;

    try {
      const userInfo = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('auth.secret'),
      });

      if (!userInfo) {
        throw new BadRequestException(httpBusinessMappingCodes.userNotFound);
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
