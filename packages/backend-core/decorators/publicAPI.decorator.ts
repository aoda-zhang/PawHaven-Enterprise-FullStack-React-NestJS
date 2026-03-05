import { SetMetadata } from '@nestjs/common';

import { commonDecoratorsKeys } from './decorator.constant';

// No need verify token
// There will no any verification when use PublicAPI , therefor Please double confirm when use it
export const PublicAPI: () => MethodDecorator = () =>
  SetMetadata(commonDecoratorsKeys.publicAPI, true);
