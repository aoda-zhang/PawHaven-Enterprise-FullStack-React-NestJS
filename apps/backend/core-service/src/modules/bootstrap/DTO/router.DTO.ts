/* eslint-disable max-classes-per-file */
import { createZodDto } from 'nestjs-zod';
import { RouterItemSchema } from '@pawhaven/shared/types';

export class RouterItemDTO extends createZodDto(RouterItemSchema) {}
export class CreatedRouteDTO {
  element!: string;

  path!: string | null;

  handle!: unknown;
}
