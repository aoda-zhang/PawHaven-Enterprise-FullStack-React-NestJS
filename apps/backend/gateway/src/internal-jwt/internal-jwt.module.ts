import { Module } from '@nestjs/common';

import { RoutingModule } from '../routing/routing.module';

import { InternalJwtService } from './internal-jwt.service';
import { InternalJwtTargetResolver } from './internal-jwt-target.resolver';

@Module({
  imports: [RoutingModule],
  providers: [InternalJwtService, InternalJwtTargetResolver],
  exports: [InternalJwtService, InternalJwtTargetResolver],
})
export class GatewayInternalJwtModule {}
