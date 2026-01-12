import { Provider, Type } from '@nestjs/common';

import { PrismaModuleOptions } from './prisma/prisma.module';

/**
 * =========================
 * Module features (Structure)
 * =========================
 */
export const SharedModuleFeatures = {
  PrismaModule: 'PrismaModule',
  SwaggerModule: 'SwaggerModule',
  MonitoringModule: 'MonitoringModule',
} as const;

export type SharedModuleName = keyof typeof SharedModuleFeatures;

/**
 * Module options mapping
 * - `never` means this module does not accept options
 */
export interface SharedModuleOptionMap {
  [SharedModuleFeatures.PrismaModule]: PrismaModuleOptions;
  [SharedModuleFeatures.SwaggerModule]: never;
  [SharedModuleFeatures.MonitoringModule]: never;
}

/**
 * Module item
 * - Automatically infers whether `options` is required
 */
export type SharedModuleItem = {
  [K in SharedModuleName]: SharedModuleOptionMap[K] extends never
    ? { module: K }
    : { module: K; options: SharedModuleOptionMap[K] };
}[SharedModuleName];

/**
 * =========================
 * Provider features (Behavior)
 * =========================
 */
export const SharedProviderFeatures = {
  HttpErrorMiddleware: 'HttpErrorMiddleware',
  HttpSuccessMiddleware: 'HttpSuccessMiddleware',
} as const;

export type SharedProviderName = keyof typeof SharedProviderFeatures;

/**
 * Provider item
 * - `provider` can be class / factory / value
 * - `token` is optional (supports useClass / useFactory / APP_*)
 */
export interface SharedProviderItem {
  provider: Provider | Type<any>;
  token?: string | symbol;
}
