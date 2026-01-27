import { AuthModule } from '@modules/Auth/auth.module';
import { Module } from '@nestjs/common';
import {
  microServiceNames,
  SharedModule,
  SharedModuleFeatures,
} from '@pawhaven/backend-core';

@Module({
  imports: [
    SharedModule.forRoot({
      serviceName: microServiceNames.AUTH,
      modules: [
        {
          module: SharedModuleFeatures.SwaggerModule,
        },
      ],
    }),
    AuthModule,
  ],
})
export class AppModule {}
