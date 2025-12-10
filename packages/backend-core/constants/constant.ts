export const EnvConstant = {
  dev: 'dev',
  uat: 'uat',
  test: 'test',
  prod: 'prod',
};

export type EnvTypes = keyof typeof EnvConstant;

export const MicroServiceNames = {
  GATEWAY: 'gateway',
  CORE: 'core-service',
  DOCUMENT: 'document-service',
  AUTH: 'auth-service',
} as const;

export const Versions = {
  v1: 'v1',
  v2: 'v2',
};

type VersionType = (typeof Versions)[keyof typeof Versions];

export type MicroServiceNameType =
  (typeof MicroServiceNames)[keyof typeof MicroServiceNames];

export type MSMessagePatternType = {
  [key: string]: `${MicroServiceNameType}.${string}.${VersionType}`;
};
