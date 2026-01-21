/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export const mongoDBPrismaConfig = defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: env('CORE_SERVICE_MONGODB'),
  },
});
