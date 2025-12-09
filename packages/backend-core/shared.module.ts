import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigsModule } from './dynamicModule/configModule/configs.module';
// import { DatabaseModule } from './dynamicModule/dataBase/db.module'
import { HttpExceptionFilter } from './dynamicModule/httpClient/httpExceptionFilter';
import { HttpSuccessInterceptor } from './dynamicModule/httpClient/httpInterceptor';
import { MiddlewareModule } from './middlewares/index.module';
import { HttpClientModule } from './dynamicModule/httpClient/httpClient.module';
import {
  SharedModuleFeatures,
  SharedModuleOptions,
  SharedModuleProviders,
} from './types/index.types';

@Global()
@Module({})
export class SharedModule {
  private static DEFAULT_FEATURES = [
    SharedModuleFeatures.Config,
    SharedModuleFeatures.HttpClient,
    SharedModuleFeatures.Monitoring,
  ];

  static forRoot(options: SharedModuleOptions): DynamicModule {
    const {
      serviceName,
      features: { imports = [], providers = [] },
    } = options;
    const importsToLoad = (
      imports?.length > 0 ? imports : this.DEFAULT_FEATURES
    ) as SharedModuleFeatures[];
    const providersToLoad = this.loadProviders(providers) as Provider[];
    const loadedModules = this.loadModules(serviceName, importsToLoad);

    return {
      module: SharedModule,
      imports: loadedModules,
      exports: loadedModules,
      providers: providersToLoad,
    };
  }

  private static loadModules(
    serviceName: string,
    features: SharedModuleFeatures[],
  ): Array<Type<any> | DynamicModule> {
    const loadedModules: Array<Type<any> | DynamicModule> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const feature of features) {
      try {
        switch (feature) {
          case SharedModuleFeatures.Config:
            loadedModules.push(ConfigsModule.forRoot(serviceName));
            break;

          case SharedModuleFeatures.HttpClient:
            loadedModules.push(HttpClientModule);
            break;

          case SharedModuleFeatures.Monitoring:
            loadedModules.push(MiddlewareModule);
            break;
          // case SharedModuleFeatures.Database:
          //   loadedModules.push(DatabaseModule);
          //   break;

          default:
            console.warn(`Unknown feature: ${feature}`);
            break;
        }
      } catch (error) {
        console.error(`Failed to load feature ${feature}`, error);
      }
    }

    return loadedModules;
  }

  private static loadProviders(
    providers: SharedModuleProviders[] = [],
  ): Array<Record<string, any>> {
    const loadedProviders: Array<Record<string, any>> = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const provider of providers) {
      try {
        switch (provider) {
          case SharedModuleProviders.HttpErrorMiddleware:
            loadedProviders.push({
              provide: APP_FILTER,
              useClass: HttpExceptionFilter,
            });
            break;

          case SharedModuleProviders.HttpSuccessMiddleware:
            loadedProviders.push({
              provide: APP_INTERCEPTOR,
              useClass: HttpSuccessInterceptor,
            });
            break;

          default:
            console.warn(`Unknown provider: ${provider}`);
            break;
        }
      } catch (error) {
        console.error(`Failed to load provider ${provider}`, error);
      }
    }

    return loadedProviders;
  }
}
