// No token verify route
import { SetMetadata } from '@nestjs/common';

export const NoToken: () => MethodDecorator = () =>
  SetMetadata("NOTOKEN", true);
