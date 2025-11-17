// environment constants
export const EnvConstant = {
  dev: 'dev',
  uat: 'uat',
  test: 'test',
  prod: 'prod',
};
export const MicroServiceNames = {
  TRIP: 'trip',
  DOCUMENT: 'document',
  AUTH: 'auth',
};

// microservice names when using microservice client
export const MSClientNames = {
  MS_TRIP: 'MS_TRIP',
  MS_DOCUMENT: 'MS_DOCUMENT',
  MS_AUTH: 'MS_AUTH',
};

// config keys from env config file
export const ConfigKeys = {
  DBConnections: 'DBConnections',
  MicroServices: 'MicroServices',
  microServiceOptions: 'microServiceOptions',
  I18n: 'I18nOptions',
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
