import { z } from 'zod';

const HandleSchema = z.object({}).strict();

const RouterItemSchema: z.ZodType<any> = z.lazy(() =>
  z
    .object({
      element: z.string(),
      path: z.string().optional(),
      children: z.array(RouterItemSchema).optional(),
      handle: HandleSchema.optional(),
    })
    .strict(),
);

export const RouterSchema = z.array(RouterItemSchema);

export type RouterItem = z.infer<typeof RouterItemSchema>;
export type Router = z.infer<typeof RouterSchema>;
