// import { ACLModule } from '@modules/ACL/ACLs.module'
import path from 'node:path';

import { AuthModule } from '@modules/Auth/auth.module';
import { Module } from '@nestjs/common';
// import SharedModule from '@shared/shared.module'
import { EnvConstant } from '@shared/constants/constant';
// import { UserModule } from '@modules/User/user.module'
const currentEnv = process.env.NODE_ENV ?? 'uat';
const configFilePath = path.resolve(
  __dirname,
  `./config/${EnvConstant[currentEnv]}/env/index.yaml`,
);

@Module({
  imports: [
    // SharedModule.forRoot({
    //   configFilePath
    // }),
    // UserModule,
    AuthModule,
    // ACLModule
  ],
})
export class AppModule {}
