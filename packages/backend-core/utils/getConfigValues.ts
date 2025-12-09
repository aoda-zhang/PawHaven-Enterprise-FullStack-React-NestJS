import { readFileSync } from 'node:fs';

import * as yaml from 'js-yaml';

import { EnvConstant } from '../constants/constant';

const isConfigAvaliable = (configFilePath: string) => {
  const avaliabEnvs = Object.values(EnvConstant);
  const configContent = readFileSync(configFilePath, 'utf8');
  const isAvaliable =
    avaliabEnvs.some((env) => configFilePath?.includes(env)) &&
    Object.keys(configContent)?.length > 0;
  return isAvaliable;
};

export const getConfigValues = <T = unknown>(configFilePath: string) => {
  try {
    if (isConfigAvaliable(configFilePath)) {
      return yaml.load(readFileSync(configFilePath, 'utf8')) as T;
    }
    throw new Error('No config file exist！！！');
  } catch (error) {
    console.error(`get config value error: ${error}`);
    return {};
  }
};
