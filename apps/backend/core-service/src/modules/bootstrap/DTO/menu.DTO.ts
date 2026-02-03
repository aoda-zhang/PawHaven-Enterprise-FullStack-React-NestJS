import { createZodDto } from 'nestjs-zod';
import { MenuSchema } from '@pawhaven/shared/types/menus.schema';

export class MenuDto extends createZodDto(MenuSchema) {}
