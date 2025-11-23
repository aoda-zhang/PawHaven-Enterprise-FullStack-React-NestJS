import { getConfigs } from '@pawhaven/frontend-core/config';

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

const currentEnv = import.meta.env?.MODE;

export const loadConfig = (): ConfigType => {
  return getConfigs({
    currentEnv,
    schema: ConfigSchema,
    loaders: {
      dev: () => devYaml,
      uat: () => uatYaml,
      test: () => testYaml,
      prod: () => prodYaml,
    },
  });
};
