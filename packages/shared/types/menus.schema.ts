import { z } from 'zod';

const BaseMenuSchema = z.object({
  label: z.string(),
  classNames: z.array(z.string()),
  order: z.number().int().nonnegative(),
});

export const LinkMenuSchema = BaseMenuSchema.extend({
  type: z.literal('link'),
  to: z.string().min(1),
  component: z.null(),
});

export const ComponentMenuSchema = BaseMenuSchema.extend({
  type: z.literal('component'),
  to: z.null(),
  component: z.string().min(1),
});

export const MenuItemSchema = z.discriminatedUnion('type', [
  LinkMenuSchema,
  ComponentMenuSchema,
]);

export const MenuSchema = z.array(MenuItemSchema);

export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Menu = z.infer<typeof MenuSchema>;
