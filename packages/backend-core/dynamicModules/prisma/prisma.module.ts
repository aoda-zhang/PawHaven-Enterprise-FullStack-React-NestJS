import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { DatabaseEngine } from '../../constants';

import { getPrismaInjectionToken } from './getPrismaInjectionToken';

export interface PrismaModuleOptions {
  databaseEngine: DatabaseEngine;
  Client: any;
  log?: Array<'query' | 'info' | 'warn' | 'error'>;
}

@Global()
@Module({})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions): DynamicModule {
    const injectProviderKey = getPrismaInjectionToken(options.databaseEngine);

    const provider: Provider = {
      provide: injectProviderKey,
      useFactory: async () => {
        const { Client } = options;
        const prisma = new Client({
          log: options?.log ?? ['warn', 'error'],
        });

        await prisma.$connect();

        return prisma;
      },
    };

    return {
      module: PrismaModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
