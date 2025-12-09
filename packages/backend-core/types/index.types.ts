// Nest Dynamic module
export enum SharedModuleFeatures {
  Config = 'config',
  HttpClient = 'httpClient',
  Monitoring = 'monitoring',
  Database = 'database',
}

// Nest Provider
export enum SharedModuleProviders {
  HttpErrorMiddleware = 'HttpErrorMiddleware',
  HttpSuccessMiddleware = 'HttpSuccessMiddleware',
}

export interface SharedModuleOptions {
  serviceName: string;
  features: {
    imports?: SharedModuleFeatures[];
    providers?: SharedModuleProviders[];
  };
}
