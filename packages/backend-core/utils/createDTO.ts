import { createZodDto } from 'nestjs-zod';
import type { ZodType } from 'zod';
import type { Type } from '@nestjs/common';

export function createDTO<TSchema extends ZodType<unknown>>(
  schema: TSchema,
): Type<unknown> {
  return createZodDto(schema);
}
