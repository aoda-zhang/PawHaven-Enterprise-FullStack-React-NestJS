import { ConfigSchema, type ConfigType } from './config.schema';
import devYaml from './dev/env/index.yaml';
import prodYaml from './prod/env/index.yaml';
import testYaml from './test/env/index.yaml';
import uatYaml from './uat/env/index.yaml';

const environment = import.meta.env;
const currentEnv = environment?.MODE ?? 'dev';

export const EnvVariables = {
  dev: 'dev',
  uat: 'uat',
  prod: 'prod',
  test: 'test',
};

// Replace placeholders like ${{PAWHAVEN_API_URL}} using environment variables
const interpolateEnvVariables = (configObj: Record<string, unknown>) => {
  const walk = (value: unknown): unknown => {
    // string → interpolate
    if (typeof value === 'string') {
      return value.replace(/\$\{\{(.+?)\}\}/g, (_, varName) => {
        const envKey = varName.trim();
        const envValue = environment?.[envKey];
        if (envValue === undefined) {
          console.warn(
            `Missing environment variable for placeholder: ${envKey}`,
          );
        }
        return envValue ?? '';
      });
    }

    // array → map
    if (Array.isArray(value)) {
      return value.map(walk);
    }

    // object → recurse
    if (typeof value === 'object' && value !== null) {
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, walk(v)]),
      );
    }

    return value;
  };

  return walk(configObj);
};

export const loadConfig = (): ConfigType => {
  try {
    let rawConfig;
    switch (currentEnv) {
      case EnvVariables.dev:
        rawConfig = devYaml;
        break;
      case EnvVariables.uat:
        rawConfig = uatYaml;
        break;
      case EnvVariables.test:
        rawConfig = testYaml;
        break;
      case EnvVariables.prod:
        rawConfig = prodYaml;
        break;
      default:
        rawConfig = devYaml;
    }

    // 1. interpolate env
    const interpolated = interpolateEnvVariables(rawConfig);

    // 2. validate
    const parsed = ConfigSchema.safeParse(interpolated);

    if (!parsed.success) {
      if (currentEnv !== EnvVariables.prod) {
        console.error('❌ Invalid config:', parsed.error.format());
      }
      throw new Error('Config validation failed');
    }
    return parsed.data;
  } catch (error) {
    console.error('Error loading config:', error);
    throw error;
  }
};
