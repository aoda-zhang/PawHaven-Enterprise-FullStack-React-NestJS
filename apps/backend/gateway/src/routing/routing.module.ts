import { Module } from '@nestjs/common';

import { MicroServiceRegistry } from './micro-service.registry';
import { GatewayConfigValidator } from './gateway-config.validator';

@Module({
  providers: [MicroServiceRegistry, GatewayConfigValidator],
  exports: [MicroServiceRegistry],
})
export class RoutingModule {}
