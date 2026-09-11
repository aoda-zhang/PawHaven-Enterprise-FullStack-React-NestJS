export type MicroServiceInternalJwtConfig = {
  keyId?: string;
  secret?: string;
};

export type MicroServiceOptions = {
  host?: string;
  port?: number;
  gatewayPrefix?: string;
  pathRewrite?: string;
  internalJwt?: MicroServiceInternalJwtConfig;
};

export type MicroServiceConfig = {
  name?: string;
  enable?: boolean;
  options?: MicroServiceOptions;
};
