// import * as path from 'node:path';

import { PawhavenModule } from '@modules/Pawhaven/pawhaven.module';
import { Module } from '@nestjs/common';
// import { EnvConstant } from '@pawhaven/backend-core/constants/constant';
// import SharedModule from '@pawhaven/backend-core/shared.module';

// const currentEnv = process.env.NODE_ENV ?? 'uat';
// const configFilePath = path.resolve(
//   __dirname,
//   `./config/${EnvConstant[currentEnv]}/env/index.yaml`,
// );
@Module({
  imports: [
    // SharedModule.forRoot({
    //   configFilePath,
    // }),
    PawhavenModule,
  ],
  providers: [],
})
export class AppModule { }
