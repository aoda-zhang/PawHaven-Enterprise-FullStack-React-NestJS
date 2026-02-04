import { createZodDto } from 'nestjs-zod';
import { MenuItemSchema } from '@pawhaven/shared/types/menus.schema';

export class MenuItemDto extends createZodDto(MenuItemSchema) {}
