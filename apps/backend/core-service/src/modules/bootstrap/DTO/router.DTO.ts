import { createZodDto } from 'nestjs-zod';
import { RouterItemSchema } from '@pawhaven/shared/types/router.schema';

export class RouterItemDTO extends createZodDto(RouterItemSchema) {}
