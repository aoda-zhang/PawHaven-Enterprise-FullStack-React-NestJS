import { z } from 'zod';

/**
 * Router meta information used by frontend & backend.
 * This is intentionally simple and data-driven.
 */
export interface RouterHandle {
  isRequireUserLogin?: boolean;
  isMenuAvailable?: boolean;
  isLazyLoad?: boolean;
  [key: string]: any;
}

export interface RouterItem {
  element: string;
  path?: string;
  children?: RouterItem[];
  handle?: RouterHandle;
}

/**
 * Zod schemas
 */
const HandleSchema = z.object({
  isRequireUserLogin: z.boolean().optional(),
  isMenuAvailable: z.boolean().optional(),
  isLazyLoad: z.boolean().optional(),
});

export const RouterItemSchema: z.ZodType<RouterItem> = z.lazy(() =>
  z.object({
    element: z.string(),
    path: z.string().optional(),
    children: z.array(RouterItemSchema).optional(),
    handle: HandleSchema.optional(),
  }),
);

export const RouterSchema = z.array(RouterItemSchema);

export type Router = z.infer<typeof RouterSchema>;
