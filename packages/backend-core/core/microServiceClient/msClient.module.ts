import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { ConfigKeys, MSClientNames } from '../../constants/constant';
import getConfigValues from '../../utils/getConfigValues';

@Global()
@Module({})
class MSClientModule {
  static register(configFilePath: string): DynamicModule {
    const configValues = getConfigValues(configFilePath);
    const availableMicroServices = configValues?.[
      ConfigKeys.MicroServices
    ]?.filter((item) => item?.enable && MSClientNames?.[item?.name]);
    const isExistMicroService = availableMicroServices?.length > 0;
    const microServices =
      isExistMicroService &&
      availableMicroServices?.map((service) => ({
        name: service?.name,
        transport: service?.transport,
        options: service?.options,
      }));

    const microServiceClients = ClientsModule.register(microServices || []);

    return {
      module: MSClientModule,
      imports: isExistMicroService ? [microServiceClients] : [],
      exports: isExistMicroService ? [microServiceClients] : [],
    };
  }
}

export default MSClientModule;
