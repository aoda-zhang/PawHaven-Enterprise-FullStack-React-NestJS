import { Module } from '@nestjs/common';

import { IdentityModule } from '../identity/identity.module';
import { GatewayInternalJwtModule } from '../internal-jwt/internal-jwt.module';
import { RoutingModule } from '../routing/routing.module';

import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';

@Module({
  imports: [RoutingModule, IdentityModule, GatewayInternalJwtModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
