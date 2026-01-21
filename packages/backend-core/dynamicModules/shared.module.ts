import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { MiddlewareModule } from '../middlewares/index.module';
import { MicroServiceNameType } from '../constants/microServices';

import { HttpSuccessInterceptor } from './httpClient/httpInterceptor';
import { HttpExceptionFilter } from './httpClient/httpExceptionFilter';
import { SwaggerModule } from './swagger/swagger.module';
import { ConfigsModule } from './configModule/configs.module';
import { HttpClientModule } from './httpClient/httpClient.module';
import { PrismaModule } from './prisma/prisma.module';
import { SharedModuleFeatures, SharedModuleItem } from './sharedModule.type';

interface SharedModuleForRootOptions {
  serviceName: MicroServiceNameType;
  modules?: SharedModuleItem[];
  providers?: Provider[];
}

@Global()
@Module({})
export class SharedModule {
  static forRoot(options: SharedModuleForRootOptions): DynamicModule {
    const { serviceName, modules = [], providers = [] } = options;

    const defaultModules = this.getDefaultModules(serviceName);

    const loadedExtraModules = this.loadExtraModules(modules);

    const defaultProviders = this.getDefaultProviders();

    const loadedExtraProviders = this.loadExtraProviders(providers);

    return {
      module: SharedModule,
      imports: [...defaultModules, ...loadedExtraModules],
      exports: [...defaultModules, ...loadedExtraModules],
      providers: [...defaultProviders, ...loadedExtraProviders],
    };
  }

  private static getDefaultModules(
    serviceName: MicroServiceNameType,
  ): Array<Type<any> | DynamicModule> {
    return [ConfigsModule.forRoot(serviceName), HttpClientModule];
  }

  private static loadExtraModules(
    items: SharedModuleItem[],
  ): Array<Type<any> | DynamicModule> {
    return items.map((item) => {
      switch (item.module) {
        case SharedModuleFeatures.PrismaModule:
          return PrismaModule.forRoot(item?.options);

        case SharedModuleFeatures.SwaggerModule:
          return SwaggerModule;

        case SharedModuleFeatures.MonitoringModule:
          return MiddlewareModule;

        default:
          throw new Error(`Unknown module: ${item}`);
      }
    });
  }

  private static getDefaultProviders(): Provider[] {
    return [
      { provide: APP_FILTER, useClass: HttpExceptionFilter },
      { provide: APP_INTERCEPTOR, useClass: HttpSuccessInterceptor },
    ];
  }

  private static loadExtraProviders(providers: Provider[]): Provider[] {
    return [...providers];
  }
}
