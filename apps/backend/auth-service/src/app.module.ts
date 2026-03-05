import { join } from 'path';

import { AuthModule } from '@modules/Auth/auth.module';
import { Module } from '@nestjs/common';
import { PrismaClient as MongoPrismaClient } from '@prisma/client';
import { SharedModule, SharedModuleFeatures } from '@pawhaven/backend-core';
import { databaseEngines } from '@pawhaven/backend-core/constants';

@Module({
  imports: [
    SharedModule.forRoot({
      serviceRoot: join(__dirname, '..'),
      modules: [
        {
          module: SharedModuleFeatures.JWTModule,
        },
        {
          module: SharedModuleFeatures.PrismaModule,
          options: {
            databaseEngine: databaseEngines.mongodb,
            Client: MongoPrismaClient,
          },
        },
        {
          module: SharedModuleFeatures.SwaggerModule,
        },
      ],
    }),
    AuthModule,
  ],
})
export class AppModule {}
