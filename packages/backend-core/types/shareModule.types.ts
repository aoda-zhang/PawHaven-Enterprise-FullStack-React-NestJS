import { MicroServiceNameType } from '../constants/microServices';

// Nest Dynamic module
export enum SharedModuleFeatures {
  Config = 'config',
  HttpClient = 'httpClient',
  Monitoring = 'monitoring',
  Database = 'database',
  Swagger = 'swagger',
}

// Nest Provider
export enum SharedModuleProviders {
  HttpErrorMiddleware = 'HttpErrorMiddleware',
  HttpSuccessMiddleware = 'HttpSuccessMiddleware',
}

export interface SharedModuleOptions {
  serviceName: MicroServiceNameType;
  features: {
    imports?: SharedModuleFeatures[];
    providers?: SharedModuleProviders[];
  };
}
