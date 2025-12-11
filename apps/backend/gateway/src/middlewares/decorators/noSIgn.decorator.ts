import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

import { decoratorsKeys } from './decorator.constant';

export const NoSign = (): CustomDecorator =>
  SetMetadata(decoratorsKeys.noSign, true);
