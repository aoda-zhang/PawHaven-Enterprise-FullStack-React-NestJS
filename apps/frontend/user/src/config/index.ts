import { ConfigSchema, type ConfigType } from './config.schema';
import devYaml from './dev/env/index.yaml';
import prodYaml from './prod/env/index.yaml';
import testYaml from './test/env/index.yaml';
import uatYaml from './uat/env/index.yaml';

export const EnvVariables = {
  dev: 'dev',
  uat: 'uat',
  prod: 'prod',
  test: 'test',
} as const;

const environmentVariables = import.meta.env;
console.log('environmentVariables-----------------', environmentVariables);

const currentEnv = environmentVariables.PAWHAVEN_USER_APP_ENV;

console.log('currentEnv-----------------', currentEnv);

if (!currentEnv || !(currentEnv in EnvVariables)) {
  throw new Error(`Invalid or missing environment mode: ${currentEnv}`);
}

// Replace placeholders like ${VARIABLE_NAME} using environment variables
const formatEnvValues = (configObj: Record<string, unknown>) => {
  const walk = (value: unknown): unknown => {
    if (typeof value === 'string') {
      return value.replace(/\$\{([^}]+)\}/g, (_, varName) => {
        const envKey = varName.trim();
        const envValue = environmentVariables?.[envKey];
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
    const interpolated = formatEnvValues(rawConfig);

    // 2. validate
    const parsed = ConfigSchema.safeParse(interpolated);

    if (!parsed.success) {
      if (currentEnv !== EnvVariables.prod) {
        console.error('❌ Invalid config:', parsed?.error);
      }
      throw new Error('Config validation failed');
    }
    return parsed.data;
  } catch (error) {
    if (currentEnv !== EnvVariables.prod) {
      console.error('Error loading config:', error);
    }
    throw new Error('Config validation failed');
  }
};
