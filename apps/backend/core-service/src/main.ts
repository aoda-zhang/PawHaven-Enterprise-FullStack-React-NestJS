import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'coreService', // change to your proto package name
        protoPath: join(
          __dirname,
          '../../../../packages//backend-core/protos/animal.proto',
        ), // adjust path if needed
        url: '0.0.0.0:9091',
      },
    },
  );

  await app.listen();
  console.log('gRPC core-service is running on 0.0.0.0:9091');
}

bootstrap();
