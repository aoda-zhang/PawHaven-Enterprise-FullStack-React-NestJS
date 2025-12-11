import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { MiddlewareModule } from '../middlewares/index.module';
import {
  SharedModuleFeatures,
  SharedModuleOptions,
  SharedModuleProviders,
} from '../types/shareModule.types';

import { ConfigsModule } from './configModule/configs.module';
// import { DatabaseModule } from './dataBase/db.module'
import { HttpExceptionFilter } from './httpClient/httpExceptionFilter';
import { HttpSuccessInterceptor } from './httpClient/httpInterceptor';
import { HttpClientModule } from './httpClient/httpClient.module';
import { SwaggerModule } from './swagger/swagger.module';

@Global()
@Module({})
export class SharedModule {
  private static DEFAULT_FEATURES = [
    SharedModuleFeatures.Config,
    SharedModuleFeatures.HttpClient,
  ];

  static forRoot(options: SharedModuleOptions): DynamicModule {
    const {
      serviceName,
      features: { imports = [], providers = [] },
    } = options;
    const importsToLoad = [
      ...new Set([...this.DEFAULT_FEATURES, ...imports]),
    ] as SharedModuleFeatures[];
    const providersToLoad = this.loadProviders(providers) as Provider[];
    const loadedModules = this.loadModules(serviceName, importsToLoad);

    console.log(
      `\n[SharedModule] Service "${serviceName}" will load ${importsToLoad.length} module(s):`,
    );
    importsToLoad.forEach((name) => console.log(`  - ${name}`));

    console.log(
      `[SharedModule] Providers to register (${providersToLoad.length}):`,
    );
    providersToLoad.forEach((name) => console.log(`  - ${name}`));
    console.log('');

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

          case SharedModuleFeatures.Swagger:
            loadedModules.push(SwaggerModule);
            break;
          // case SharedModuleFeatures.Database:
          //   loadedModules.push(DatabaseModule);
          //   break;

          default:
            console.warn(`Unknown feature: ${feature}`);
            break;
        }
      } catch (error) {
        throw new Error(
          `Failed to load feature : ${feature} Module , error info: ${error}`,
        );
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
        throw new Error(
          `Failed to load feature : ${provider} , error info: ${error}`,
        );
      }
    }

    return loadedProviders;
  }
}
