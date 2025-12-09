import path from 'node:path';

// import { AuthModule } from '@modules/Auth/auth.module';
import { Module } from '@nestjs/common';
import {
  SharedModule,
  SharedModuleImports,
} from '@pawhaven/backend-core/sharedModule';

import { GatewayController } from './app.controller';
import { AuthService } from './services/auth.service';
// import { APP_GUARD } from '@nestjs/core';
// import { DocumentModule } from '@modules/Document/document.module';
// import { JwtModule } from '@nestjs/jwt';
// import { SignGuard } from '@modules/Auth/guards/Sign.guard';
// import { JWTGuard } from '@modules/Auth/guards/JWT.guard';
// import ACLGuard from '@modules/ACL/middlewares/ACL.guard'
const currentEnv = process.env.NODE_ENV ?? 'uat';
const configFilePath = path.resolve(
  __dirname,
  `./config/${currentEnv}/env/index.yaml`,
);

@Module({
  imports: [
    SharedModule.forRoot({
      configPath: configFilePath,
      features: {
        imports: [SharedModuleImports.Config, SharedModuleImports.HttpClient],
        providers: undefined,
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
