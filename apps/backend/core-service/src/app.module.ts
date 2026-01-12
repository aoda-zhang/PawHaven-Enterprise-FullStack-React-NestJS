import { BootstrapModule } from '@modules/bootstrap/bootstrap.module';
import { ReportAnimalModule } from '@modules/reportAnimal/index.module';
import { Module } from '@nestjs/common';
import {
  databaseEngines,
  microServiceNames,
  SharedModule,
  SharedModuleFeatures,
} from '@pawhaven/backend-core';
import { PrismaClient as MongoPrismaClient } from '@prisma-mongo-client';

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
            log: ['query'],
          },
        },
      ],
    }),
    ReportAnimalModule,
    BootstrapModule,
  ],
})
export class AppModule {}
