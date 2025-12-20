import type { RuntimeEnvType } from '../constants/runtimeEnv';
import { runtimeEnv } from '../constants/runtimeEnv';

export const getRuntimeEnv = (currentRuntimeEnv: RuntimeEnvType): string => {
  return runtimeEnv?.[currentRuntimeEnv] ?? runtimeEnv.uat;
};
