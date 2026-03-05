import { join } from 'path';

import { Module } from '@nestjs/common';
import { SharedModule } from '@pawhaven/backend-core';

import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    SharedModule.forRoot({
      serviceRoot: join(__dirname, '..'),
      modules: [],
    }),
    ProxyModule,
  ],
})
export class AppModule {}
