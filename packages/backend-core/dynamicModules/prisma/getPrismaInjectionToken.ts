export const PRISMA_CLIENT = Symbol('PRISMA_CLIENT');

export const getPrismaInjectionToken = (name: string) =>
  `${PRISMA_CLIENT.toString()}:${name}`;
