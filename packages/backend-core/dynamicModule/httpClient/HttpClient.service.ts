import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpClientInstance } from './httpClientInstance';


@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) { }

  create(serviceName: string) {
    if (!serviceName) {
      throw new Error('HttpClientService: baseURL is required');
    }

    const defaultHeaders = {
      'X-App-Source': 'nestjs-gateway',
      'X-Env': this.config.get<string>('NODE_ENV') || 'development',
    };

    return new HttpClientInstance(
      this.httpService,
      this.config,
      serviceName,
      defaultHeaders,
      this.logger,
    );
  }
}
