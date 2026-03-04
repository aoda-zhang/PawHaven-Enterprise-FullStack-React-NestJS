import { SetMetadata } from '@nestjs/common';

import { decoratorsKeys } from './decorator.constant';

// No need verify token
// There will no any verification when use PublicAPI , therefor Please double confirm when use it
export const Public: () => MethodDecorator = () =>
  SetMetadata(decoratorsKeys.public, true);
