import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ENVIRONMENTS = ['dev', 'test', 'uat', 'prod'];

const AUTH_SERVICE_CONFIG_DIRECTORY = 'apps/backend/auth-service/src/config';
const GATEWAY_CONFIG_DIRECTORY = 'apps/backend/gateway/src/config';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readNumberValue(filePath, key) {
  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
  const line = lines.find((candidate) =>
    candidate.trim().startsWith(`${key}:`),
  );

  if (line === undefined) {
    throw new Error(`${key} is missing from ${filePath}`);
  }

  const raw = line.slice(line.indexOf(':') + 1).trim();
  const value = Number(raw);

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(
      `${key} in ${filePath} must be a positive number, got "${raw}"`,
    );
  }

  return value;
}

function readSessionConfig(env) {
  const authServiceConfig = resolve(
    repoRoot,
    AUTH_SERVICE_CONFIG_DIRECTORY,
    env,
    'env/index.yaml',
  );
  const gatewayConfig = resolve(
    repoRoot,
    GATEWAY_CONFIG_DIRECTORY,
    env,
    'env/index.yaml',
  );

  return {
    authServiceConfig,
    gatewayConfig,
    jwtExpiresIn: readNumberValue(authServiceConfig, 'jwtExpiresIn'),
    jwtRefreshFallbackSeconds: readNumberValue(
      gatewayConfig,
      'jwtRefreshFallbackSeconds',
    ),
    jwtRefreshWindowPercentage: readNumberValue(
      gatewayConfig,
      'jwtRefreshWindowPercentage',
    ),
  };
}

const failures = [];

for (const env of ENVIRONMENTS) {
  const {
    authServiceConfig,
    gatewayConfig,
    jwtExpiresIn,
    jwtRefreshFallbackSeconds,
    jwtRefreshWindowPercentage,
  } = readSessionConfig(env);

  for (const [key, value, filePath] of [
    ['auth.jwtExpiresIn', jwtExpiresIn, authServiceConfig],
    [
      'auth.jwtRefreshFallbackSeconds',
      jwtRefreshFallbackSeconds,
      gatewayConfig,
    ],
  ]) {
    if (!Number.isInteger(value)) {
      failures.push(
        `[${env}] ${key} must be a positive integer, got ${value} (${filePath})`,
      );
    }
  }

  if (jwtRefreshFallbackSeconds >= jwtExpiresIn) {
    failures.push(
      `[${env}] auth.jwtRefreshFallbackSeconds (${jwtRefreshFallbackSeconds}) must be < auth.jwtExpiresIn (${jwtExpiresIn}). ` +
        `When the fallback covers the token's whole lifetime, ExpiryPolicy marks every request as refresh-due. ` +
        `LATENT, NOT LIVE: auth.service.ts signs without noTimestamp, so jsonwebtoken adds iat and the fallback branch is unreachable today. ` +
        `It becomes live the moment any flow issues a token without iat. ` +
        `Files: ${gatewayConfig}, ${authServiceConfig}`,
    );
  }

  const derivedWindowSeconds = Math.floor(
    jwtExpiresIn * jwtRefreshWindowPercentage,
  );

  if (jwtRefreshFallbackSeconds !== derivedWindowSeconds) {
    console.warn(
      `[warn] [${env}] auth.jwtRefreshFallbackSeconds (${jwtRefreshFallbackSeconds}) differs from ` +
        `floor(auth.jwtExpiresIn * auth.jwtRefreshWindowPercentage) (${derivedWindowSeconds}). ` +
        `Expected while auth-service issues access tokens at jwtExpiresIn (auth.service.ts). ` +
        `Revisit if a shorter-lived token (step-up/re-auth) is introduced.`,
    );
  }
}

if (failures.length > 0) {
  console.error('session config contract check failed:\n');
  for (const failure of failures) {
    console.error(`  ${failure}\n`);
  }
  process.exit(1);
}

console.log(
  `session config contract check passed (${ENVIRONMENTS.length} environments)`,
);
