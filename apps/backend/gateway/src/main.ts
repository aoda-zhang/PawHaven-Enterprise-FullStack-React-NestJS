import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupApp } from './app-setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    forceCloseConnections: true,
  });

  const logger = new Logger('Bootstrap');

  // Setup app (CORS, security, pipes, versioning)
  await setupApp(app);

  const configService = app.get(ConfigService) as ConfigService;
  const port = configService.get<number>('http.port', 8080);

  try {
    await app.listen(port, '0.0.0.0');
    logger.log(`Gateway running at http://localhost:${port}`);
  } catch (error) {
    logger.error('Failed to start Gateway', error);
    throw new Error(
      `Bootstrap failed: ${error instanceof Error ? error.message : error}`,
    );
  }
}

bootstrap();
