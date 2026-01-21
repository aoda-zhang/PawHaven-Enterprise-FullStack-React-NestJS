import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { DatabaseEngine } from '../../constants';

import { getPrismaInjectionToken } from './getPrismaInjectionToken';
import { defaultPrismaExtensions } from './extensions';

export interface PrismaExtension {
  name?: string;
  query?: Record<string, unknown>;
  model?: Record<string, unknown>;
  result?: Record<string, unknown>;
  client?: Record<string, unknown>;
}

export interface PrismaModuleOptions {
  databaseEngine: DatabaseEngine;
  Client: any;
  extensions?: PrismaExtension[];
}

@Global()
@Module({})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions): DynamicModule {
    const injectProviderKey = getPrismaInjectionToken(options.databaseEngine);

    const provider: Provider = {
      provide: injectProviderKey,
      useFactory: async () => {
        const { Client, extensions = [] } = options;

        const basePrisma = new Client();

        const prisma = [...defaultPrismaExtensions, ...extensions].reduce(
          (client, ext) => client.$extends(ext),
          basePrisma,
        );

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
