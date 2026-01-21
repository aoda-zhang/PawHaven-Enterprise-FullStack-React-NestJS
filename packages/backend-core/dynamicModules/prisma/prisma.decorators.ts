import { Inject } from '@nestjs/common';

import { getPrismaInjectionToken } from './getPrismaInjectionToken';

export const InjectPrisma = (name: string) =>
  Inject(getPrismaInjectionToken(name));
