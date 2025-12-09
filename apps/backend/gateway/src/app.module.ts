import { Module } from '@nestjs/common';
import {
  MicroServiceNames,
  SharedModule,
  SharedModuleFeatures,
} from '@pawhaven/backend-core';

import { GatewayController } from './app.controller';
import { AuthService } from './services/auth.service';
// import { APP_GUARD } from '@nestjs/core';
// import { DocumentModule } from '@modules/Document/document.module';
// import { JwtModule } from '@nestjs/jwt';
// import { SignGuard } from '@modules/Auth/guards/Sign.guard';
// import { JWTGuard } from '@modules/Auth/guards/JWT.guard';
// import ACLGuard from '@modules/ACL/middlewares/ACL.guard'

@Module({
  imports: [
    SharedModule.forRoot({
      serviceName: MicroServiceNames.GATEWAY,
      features: {
        imports: [SharedModuleFeatures.Swagger],
        providers: [],
      },
    }),
    // JwtModule,
    // DocumentModule,
    // AuthModule,
  ],
  controllers: [GatewayController],
  providers: [
    AuthService,

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
