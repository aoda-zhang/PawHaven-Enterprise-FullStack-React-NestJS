import { Global, Module } from '@nestjs/common';

import { CorePrismaService } from './core-service-mongoDB.prisma';

@Global()
@Module({
  providers: [CorePrismaService],
  exports: [CorePrismaService],
})
export class DatabaseModule {}
