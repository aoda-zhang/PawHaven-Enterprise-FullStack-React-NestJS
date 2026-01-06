/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-default-export */
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'schema.prisma',
  migrations: {
    path: 'migrations',
  },
  datasource: {
    url: process.env.CORE_SERVICE_MONGODB,
  },
});
