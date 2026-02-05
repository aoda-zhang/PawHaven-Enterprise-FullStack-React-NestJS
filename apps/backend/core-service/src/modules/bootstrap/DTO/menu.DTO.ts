import { createZodDto } from 'nestjs-zod';
import { MenuItemSchema } from '@pawhaven/shared/types/menu.schema';

export class MenuItemDto extends createZodDto(MenuItemSchema) {}
