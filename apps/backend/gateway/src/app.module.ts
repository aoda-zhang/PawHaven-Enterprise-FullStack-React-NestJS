// import path from 'node:path';

import { AuthModule } from '@modules/Auth/auth.module';
import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import SharedModule from '@pawhaven/shared.module';
// import { DocumentModule } from '@modules/Document/document.module';
// import { EnvConstant } from '@pawhaven/backend-core/constants/constant';
// import { JwtModule } from '@nestjs/jwt';
// import { SignGuard } from '@modules/Auth/guards/Sign.guard';
// import { JWTGuard } from '@modules/Auth/guards/JWT.guard';
// import ACLGuard from '@modules/ACL/middlewares/ACL.guard'
// const currentEnv = process.env.NODE_ENV ?? 'uat';
// const configFilePath = path.resolve(
//   __dirname,
//   `./config/${EnvConstant[currentEnv]}/env/index.yaml`,
// );

@Module({
  imports: [
    // SharedModule.forRoot({
    //   configFilePath,
    //   isIntergrateHttpExceptionFilter: true,
    //   isIntergrateHttpInterceptor: true,
    // }),
    // JwtModule,
    // DocumentModule,
    AuthModule,
  ],
  controllers: [],
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
    //     provide: APP_GUARD,
    //     useClass: ACLGuard
    // }
  ],
})
export class AppModule { }
