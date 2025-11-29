import ACLService from '@modules/ACL/ACLs.service';
import {
  BadRequestException,
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Decorators } from '@shared/constants/enum';
import {
  HttpBusinessCode,
  HttpBusinessMappingCode,
} from '@shared/core/httpClient/interface';
import trime from '@shared/utils/trime';

@Injectable()
export class ACLGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private ACL: ACLService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const aclPermissions = this.reflector.getAllAndOverride<string[]>(
      Decorators.ACLPermissions,
      [context.getHandler(), context.getClass()],
    );
    try {
      // WARN: The root user have the highst poewer, pls opreat carefully!!
      if (
        !aclPermissions ||
        request?.user?.roles?.includes(this.configService.get('auth.rootUser'))
      ) {
        return true;
      }
      const currentUserPermissions = await this.ACL.getRolePermissions(
        request?.user?.roles,
      );
      return aclPermissions?.every((item) =>
        currentUserPermissions?.includes(item),
      );
    } catch (error) {
      switch (trime(error?.message)) {
        case HttpBusinessCode.jwtexpired || HttpBusinessCode.invalidToken:
          response.data = HttpBusinessMappingCode.jwtexpired;
          break;
        default:
          break;
      }
      throw new BadRequestException(`error:${error}`);
    }
  }
}
