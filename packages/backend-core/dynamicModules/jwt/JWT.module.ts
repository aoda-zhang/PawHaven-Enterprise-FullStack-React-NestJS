import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JWTGuard } from './JWT.guard';
import { JwtStrategy } from './JWT.strategy';

@Module({
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JWTGuard }],
  exports: [JwtStrategy],
})
export class JWTModule {}
