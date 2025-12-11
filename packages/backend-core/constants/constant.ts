import { microServiceNames } from './microServiceNames';

export const EnvConstant = {
  dev: 'dev',
  uat: 'uat',
  test: 'test',
  prod: 'prod',
};

export type EnvTypes = keyof typeof EnvConstant;

export const Versions = {
  v1: 'v1',
  v2: 'v2',
};

type VersionType = (typeof Versions)[keyof typeof Versions];

export type MicroServiceNameType =
  (typeof microServiceNames)[keyof typeof microServiceNames];

export type MSMessagePatternType = {
  [key: string]: `${MicroServiceNameType}.${string}.${VersionType}`;
};
