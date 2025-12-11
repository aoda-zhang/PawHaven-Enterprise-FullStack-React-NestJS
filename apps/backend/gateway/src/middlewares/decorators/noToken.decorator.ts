import { SetMetadata } from '@nestjs/common';

import { decoratorsKeys } from './decorator.constant';

// No need verify token
// Pls double confirm if use NoToken verification
export const NoToken: () => MethodDecorator = () =>
  SetMetadata(decoratorsKeys.noToken, true);
