import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtVerifyInfo } from '@pawhaven/shared/types';

const ACCESS_TOKEN_TYPE = 'access';

@Injectable()
export class AccessTokenVerifier {
  constructor(private readonly jwtService: JwtService) {}

  verify(token?: string): JwtVerifyInfo | null {
    if (!token) {
      return null;
    }
    try {
      const payload = this.jwtService.verify<JwtVerifyInfo>(token);
      if (!payload?.userId || payload.type !== ACCESS_TOKEN_TYPE) {
        return null;
      }
      return payload;
    } catch {
      return null;
    }
  }
}
