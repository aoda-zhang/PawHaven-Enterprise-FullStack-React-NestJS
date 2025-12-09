import {
  Injectable,
  OnApplicationBootstrap,
  INestApplication,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerModule as NestSwaggerModule,
} from '@nestjs/swagger';

import { getCurrentEnv } from '../../utils/getCurrentEnv';
import { EnvConstant } from '../../constants/constant';

@Injectable()
export class SwaggerService implements OnApplicationBootstrap {
  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap(app?: INestApplication) {
    if (!app) return;
    const isProd = getCurrentEnv() === EnvConstant.prod;
    if (isProd) return;

    const swaggerTitle = this.configService.get<string>('swagger.title') ?? '';
    const swaggerDesc =
      this.configService.get<string>('swagger.description') ?? '';
    const swaggerVersion =
      this.configService.get<string>('swagger.version') ?? '';
    const swaggerPrefix =
      this.configService.get<string>('swagger.prefix') ?? 'api-docs';

    const options = new DocumentBuilder()
      .setTitle(swaggerTitle)
      .setDescription(swaggerDesc)
      .setVersion(swaggerVersion)
      .addBearerAuth()
      .build();

    const document = NestSwaggerModule.createDocument(app, options);
    NestSwaggerModule.setup(swaggerPrefix, app, document);
  }
}
