import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export const NO_SIGN = 'NO_SIGN';

export const NoSign = (): CustomDecorator => SetMetadata(NO_SIGN, true);
