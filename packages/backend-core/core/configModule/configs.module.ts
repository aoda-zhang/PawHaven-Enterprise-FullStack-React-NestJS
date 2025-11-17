import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import getConfigValues from '../../utils/getConfigValues';

@Global()
@Module({})
class ConfigsModule {
  /**
   * dynamic configration
   * @param configFilePath config file path
   */
  static forRoot(configFilePath: string): DynamicModule {
    const configValues = getConfigValues(configFilePath);
    const DynamicConfigModule = ConfigModule.forRoot({
      load: [() => configValues],
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    });

    return {
      module: ConfigsModule,
      imports: [DynamicConfigModule],
    };
  }
}
export default ConfigsModule;
