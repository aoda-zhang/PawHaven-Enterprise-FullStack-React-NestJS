import { BootstrapModule } from '@modules/bootstrap/bootstrap.module';
import { ReportAnimalModule } from '@modules/reportAnimal/index.module';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import {
  databaseEngines,
  microServiceNames,
  SharedModule,
  SharedModuleFeatures,
} from '@pawhaven/backend-core';
import { PrismaClient as MongoPrismaClient } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    SharedModule.forRoot({
      serviceName: microServiceNames.CORE,
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
    ReportAnimalModule,
    BootstrapModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
