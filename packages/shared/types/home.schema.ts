import { z } from 'zod';

import { AdoptablePetSchema } from './adoptable-pet.schema';
import { HeroStatsSchema } from './hero-stats.schema';
import { RescueListItemSchema } from './rescue-list.schema';

export const HomeDataSchema = z.object({
  heroStats: HeroStatsSchema,
  latestRescues: RescueListItemSchema.array(),
  adoptablePets: AdoptablePetSchema.array(),
});

export type HomeData = z.infer<typeof HomeDataSchema>;
