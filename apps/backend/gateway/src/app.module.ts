import { Module } from '@nestjs/common';
import {
  microServiceNames,
  SharedModule,
  SharedModuleFeatures,
  SharedModuleProviders,
} from '@pawhaven/backend-core';

import { GatewayController } from './app.controller';
import { AuthService } from './services/auth.service';
import { CoreService } from './services/core.service';
// import { APP_GUARD } from '@nestjs/core';
// import { DocumentModule } from '@modules/Document/document.module';
// import { JwtModule } from '@nestjs/jwt';
// import { SignGuard } from '@modules/Auth/guards/Sign.guard';
// import { JWTGuard } from '@modules/Auth/guards/JWT.guard';
// import ACLGuard from '@modules/ACL/middlewares/ACL.guard'

@Module({
  imports: [
    SharedModule.forRoot({
      serviceName: microServiceNames.GATEWAY,
      features: {
        imports: [SharedModuleFeatures.Swagger],
        providers: [
          SharedModuleProviders.HttpErrorMiddleware,
          SharedModuleProviders.HttpSuccessMiddleware,
        ],
      },
    }),
    // JwtModule,
    // DocumentModule,
    // AuthModule,
  ],
  controllers: [GatewayController],
  providers: [
    AuthService,
    CoreService,

    // {
    //   provide: APP_GUARD,
    //   useClass: SignGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JWTGuard,
    // },
    // {
    //     provide: APP_GUARD,
    //     useClass: ACLGuard
    // }
  ],
})
export class AppModule {}
