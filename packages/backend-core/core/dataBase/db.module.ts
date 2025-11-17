import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigKeys } from '../../constants/constant';
import getConfigValues from '../../utils/getConfigValues';

@Module({})
class DatabaseModule {
  /**
   * dynamic Mongoose connection
   * @param dbConnectKeys the keys of the db connections in the config file
   */
  static forRoot(configFilePath: string): DynamicModule {
    try {
      const configValues = getConfigValues(configFilePath);
      const availableDBConnections =
        configValues?.[ConfigKeys.DBConnections]
          ?.filter((item) => item?.enable)
          ?.map((item) => item?.options) ?? [];
      const isMultipleDB = availableDBConnections?.length > 1;
      const connectionProviders = availableDBConnections?.map((DBItem) => ({
        connectionName: DBItem,
        useFactory: () => {
          return { ...(DBItem ?? {}) };
        },
      }));

      const DBConnection = connectionProviders.map((provider) =>
        MongooseModule.forRootAsync({
          // Must clearfy each DB name if there is multiple DB connections
          connectionName: isMultipleDB ? provider?.connectionName : null,
          useFactory: provider.useFactory,
          inject: provider.inject,
        }),
      );

      return {
        module: DatabaseModule,
        imports: [ConfigModule, ...DBConnection],
        exports: [...DBConnection],
      };
    } catch (error) {
      throw new Error(`DB connection error :${error}`);
    }
  }
}
export default DatabaseModule;
