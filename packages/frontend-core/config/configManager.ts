import type z from 'zod';

export type DefaultEnvironment = 'div' | 'uat' | 'test' | 'prod';

/**
 * Use default env if no custom environment
 *
 */

export type Environment<T extends string = DefaultEnvironment> = T;

export type ConfigLoader<T = unknown> = () => Promise<T> | T;

export type ConfigLoaders<
  TEnv extends string = DefaultEnvironment,
  T = unknown,
> = {
  [key in TEnv]: ConfigLoader<T>;
};

export interface ConfigManagerOptions<
  TSchema extends z.ZodType,
  TEnv extends string = DefaultEnvironment,
> {
  currentEnv: TEnv;
  schema: TSchema;
  loaders: ConfigLoaders<TEnv>;
  onError?: () => void;
  onSuccess?: () => void;
}

class ConfigManager<
  TSchema extends z.ZodType,
  TEnv extends string = DefaultEnvironment,
> {
  private config: z.infer<TSchema> | null = null;

  private readonly options: ConfigManagerOptions<TSchema, TEnv>;

  private readonly currentEnv: TEnv;

  constructor(options: ConfigManagerOptions<TSchema, TEnv>) {
    this.currentEnv = options.currentEnv;
    this.options = options;
    if (!this.validateEnv()) {
      throw new Error(`Invalid environment: ${this.currentEnv}`);
    }
  }

  private validateEnv(): boolean {
    const validEnvs = Object.keys(this.options?.loaders ?? {}) as TEnv[];
    return validEnvs.includes(this.currentEnv);
  }

  public async getConfig(): Promise<z.infer<TSchema>> {
    if (this.config) {
      return this.config;
    }
    this.config = await this.loadAndValidateConfig();
    return this.config;
  }

  private async loadAndValidateConfig(): Promise<z.infer<TSchema>> {
    try {
      const rawConfig = await this.loadRawConfig();
      const interpolatedConfig = this.interpolateEnvVariables(rawConfig);
      const validateResult = this.options.schema.safeParse(interpolatedConfig);

      if (!validateResult.success) {
        console.error('Config schema validation failed:', validateResult.error);
        throw validateResult.error;
      }
      if (validateResult.success && this.options?.onSuccess) {
        this.options.onSuccess();
      }
      return validateResult.data;
    } catch (error) {
      if (this.options?.onError) {
        this.options?.onError?.();
      }
      throw error;
    }
  }

  private async loadRawConfig(): Promise<Record<string, unknown>> {
    const currentEnvRawConfig = this.options.loaders[this.currentEnv];
    if (!currentEnvRawConfig) {
      throw new Error(`No config for current env ${this.currentEnv}`);
    }
    try {
      const result = await Promise.resolve(currentEnvRawConfig());
      return (result as Record<string, never>)?.default || result;
    } catch (error) {
      throw new Error(
        `Failed to load config for env ${this.currentEnv}:${error}`,
      );
    }
  }

  private interpolateEnvVariables(configObj: Record<string, unknown>) {
    const walk = (value: unknown): unknown => {
      if (typeof value === 'string') {
        return value.replace(/\$\{([^}]+)\}/g, (_, varName) => {
          const envKey = varName.trim();
          const envValue = this.currentEnv?.[envKey];
          if (envValue === undefined) {
            console.warn(
              `Missing environment variable for placeholder: ${envKey}`,
            );
          }
          return envValue ?? '';
        });
      }
      if (Array.isArray(value)) {
        return value.map(walk);
      }
      if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(
          Object.entries(value).map(([k, v]) => [k, walk(v)]),
        );
      }

      return value;
    };

    return walk(configObj);
  }
}

export const getConfigs = async <
  TSchema extends z.ZodType,
  TEnv extends string = DefaultEnvironment,
>(
  options: ConfigManagerOptions<TSchema, TEnv>,
) => {
  const manager = new ConfigManager(options);
  return manager.getConfig();
};
