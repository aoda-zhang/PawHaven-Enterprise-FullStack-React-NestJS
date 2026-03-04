import { AuthModule } from '@modules/Auth/auth.module';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import {
  databaseEngines,
  microServiceNames,
  SharedModule,
  SharedModuleFeatures,
} from '@pawhaven/backend-core';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaClient as MongoPrismaClient } from '@prisma/client';

@Module({
  imports: [
    SharedModule.forRoot({
      serviceName: microServiceNames.AUTH,
      modules: [
        {
          module: SharedModuleFeatures.SwaggerModule,
        },
        {
          module: SharedModuleFeatures.PrismaModule,
          options: {
            databaseEngine: databaseEngines.mongodb,
            Client: MongoPrismaClient,
          },
        },
      ],
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
