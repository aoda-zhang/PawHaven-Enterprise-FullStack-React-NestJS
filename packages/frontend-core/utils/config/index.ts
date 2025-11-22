export const EnvVariables = {
  dev: 'dev',
  uat: 'uat',
  prod: 'prod',
  test: 'test',
} as const;

const environment = import.meta.env;
const currentEnv = environment?.MODE;

if (!currentEnv || !(currentEnv in EnvVariables)) {
  throw new Error(`Invalid or missing environment mode: ${currentEnv}`);
}

/**
 * Recursively traverses a configuration object and replaces placeholders
 * Placeholders are expected in the format `${VARIABLE_NAME}` within strings.
 *
 * @param configObj - The configuration values from static yaml.
 * @returns A new configuration object with all placeholders replaced by yaml static values and env values.
 */
const formatEnvValues = (configObj: Record<string, unknown>) => {
  const walk = (value: unknown): unknown => {
    if (typeof value === 'string') {
      return value.replace(/\$\{([^}]+)\}/g, (_, varName) => {
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

export const loadConfig = <T>(): T => {
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
    console.error('Error loading config:', error);
    throw error;
  }
};
