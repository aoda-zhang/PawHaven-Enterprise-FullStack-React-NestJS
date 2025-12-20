import { runtimeEnv } from '../constants/runtimeEnv.js';
import type { RuntimeEnvType } from '../constants/runtimeEnv.js';

export const getRuntimeEnv = (currentRuntimeEnv: RuntimeEnvType): string => {
  return runtimeEnv?.[currentRuntimeEnv] ?? runtimeEnv.uat;
};
