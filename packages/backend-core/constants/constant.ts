// environment constants
export const EnvConstant = {
  dev: 'dev',
  uat: 'uat',
  test: 'test',
  prod: 'prod',
};

export type EnvTypes = keyof typeof EnvConstant;
export const MicroServiceNames = {
  TRIP: 'trip',
  DOCUMENT: 'document',
  AUTH: 'auth',
};

export const Versions = {
  v1: 'v1',
  v2: 'v2',
};

type VersionType = (typeof Versions)[keyof typeof Versions];
type MicroServiceNameType =
  (typeof MicroServiceNames)[keyof typeof MicroServiceNames];
export type MSMessagePatternType = {
  [key: string]: `${MicroServiceNameType}.${string}.${VersionType}`;
};
