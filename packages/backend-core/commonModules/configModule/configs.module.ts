import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigFactory } from '@nestjs/config';
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
      exports: [ConfigModule],
    };
  }

  private static getConfigValues<T = unknown>(serviceName: string): T {
    const PROJECT_ROOT = join(__dirname, '../../../../../');
    const currentEnv = getCurrentEnv();
    const conventionalConfigPath = join(
      PROJECT_ROOT,
      `apps/backend/${serviceName}/src/config/${currentEnv}/env/index.yaml`,
    );
    try {
      return yaml.load(readFileSync(conventionalConfigPath, 'utf8')) as T;
    } catch (error) {
      throw new Error(`Config file loading failed: ${error}`);
    }
  }
}
