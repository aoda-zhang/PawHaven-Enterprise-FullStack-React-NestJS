import { Module } from '@nestjs/common';
import { microServiceNames, SharedModule } from '@pawhaven/backend-core';

// import ACLGuard from '@modules/ACL/middlewares/ACL.guard'

// import { GatewayController } from './app.controller';
// import { AuthService } from './services/auth.service';
// import { CoreService } from './services/core.service';
// import { APP_GUARD } from '@nestjs/core';

import { ProxyModule } from './proxy/proxy.module';
// import { JWTGuard } from './middlewares/guards/JWT.guard';
// import { SignGuard } from './middlewares/guards/Sign.guard';

// import { DocumentModule } from '@modules/Document/document.module';
// import { JwtModule } from '@nestjs/jwt';
// import { SignGuard } from '@modules/Auth/guards/Sign.guard';
// import { JWTGuard } from '@modules/Auth/guards/JWT.guard';
@Module({
  imports: [
    SharedModule.forRoot({
      serviceName: microServiceNames.GATEWAY,
    }),
    ProxyModule,
    // JwtModule,
    // DocumentModule,
    // AuthModule,
  ],
  // controllers: [GatewayController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: SignGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JWTGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ACLGuard,
    // },
  ],
})
export class AppModule {}
