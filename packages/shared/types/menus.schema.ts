import { z } from 'zod';

const BaseMenuSchema = z.object({
  label: z.string(),
  classNames: z.array(z.string()),
  order: z.number().int().nonnegative(),
});

export const MenuItemSchema = BaseMenuSchema.extend({
  type: z.enum(['link', 'component']),
  to: z.string().min(1).nullable(),
  component: z.string().min(1).nullable(),
});

export const MenuSchema = z.array(MenuItemSchema);

export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Menu = z.infer<typeof MenuSchema>;
