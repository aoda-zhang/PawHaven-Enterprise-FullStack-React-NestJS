import { BootstrapModule } from '@modules/bootstrap/bootstrap.module';
import { ReportAnimalModule } from '@modules/reportAnimal/index.module';
import { Module } from '@nestjs/common';
import {
  microServiceNames,
  SharedModule,
  SharedModuleFeatures,
  SharedModuleProviders,
} from '@pawhaven/backend-core';

@Module({
  imports: [
    SharedModule.forRoot({
      serviceName: microServiceNames.CORE,
      features: {
        imports: [SharedModuleFeatures.Swagger],
        providers: [
          SharedModuleProviders.HttpErrorMiddleware,
          SharedModuleProviders.HttpSuccessMiddleware,
        ],
      },
    }),
    ReportAnimalModule,
    BootstrapModule,
  ],
})
export class AppModule {}
