import { readFileSync } from 'node:fs';

import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigFactory } from '@nestjs/config';
import * as yaml from 'js-yaml';

import { getCurrentEnv } from '../../utils/getCurrentEnv';

@Global()
@Module({})
export class ConfigsModule {
  /**
   * dynamic configuration
   * @param serviceName service name
   */
  static forRoot(serviceName: string): DynamicModule {
    const configValues = this.getConfigValues(serviceName);
    const factory: ConfigFactory = () => configValues as Record<string, any>;
    const DynamicConfigModule = ConfigModule.forRoot({
      load: [factory],
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      expandVariables: true,
    });

    return {
      module: ConfigsModule,
      imports: [DynamicConfigModule],
      exports: [ConfigService],
    };
  }

  private static getConfigValues<T = unknown>(serviceName: string): T {
    const currentEnv = getCurrentEnv();
    const conventionalConfigPath = `../../../../apps/backend/${serviceName}/config/${currentEnv}/env/index.yaml`;
    try {
      return yaml.load(readFileSync(conventionalConfigPath, 'utf8')) as T;
    } catch (error) {
      console.error(`get config value error: ${error}`);
      throw error;
    }
  }
}
