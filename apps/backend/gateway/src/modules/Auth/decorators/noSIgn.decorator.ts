import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export const NoSign = (): CustomDecorator =>
  SetMetadata("NOSIGN", true);
