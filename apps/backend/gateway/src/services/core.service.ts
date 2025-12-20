import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService, microServiceNames } from '@pawhaven/backend-core';

@Injectable()
export class CoreService {
  private readonly coreService;

  constructor(
    private httpClient: HttpClientService,
    private config: ConfigService,
  ) {
    this.coreService = this.httpClient.create(microServiceNames.CORE);
  }

  test(id: string) {
    console.log('configssssssss-------', this.config.get('http'));

    return this.coreService.get(`/core/test/${id}`);
  }
}
