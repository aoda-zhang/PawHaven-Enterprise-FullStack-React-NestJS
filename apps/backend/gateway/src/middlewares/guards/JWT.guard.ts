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
    const isPublicReq = this.reflector.getAllAndOverride<boolean>(
      decoratorsKeys.public,
      [context.getHandler(), context.getClass()],
    );

    try {
      const valid = await this.verifyToken(isPublicReq, token);
      return valid;
    } catch (error) {
      throw new BadRequestException(
        error,
        httpBusinessMappingCodes.unauthorized,
      );
    }
  }

  private async verifyToken(
    isPublicDecorator: boolean,
    token: string,
  ): Promise<boolean> {
    if (isPublicDecorator) return true;
    if (!token) return false;

    try {
      const userInfo = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('auth.secret'),
      });

      if (!userInfo) {
        throw new BadRequestException(httpBusinessMappingCodes.userNotFound);
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
