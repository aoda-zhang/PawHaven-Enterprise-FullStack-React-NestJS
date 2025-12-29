import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpClientService, microServiceNames } from '@pawhaven/backend-core';

@Injectable()
export class CoreService {
  private readonly coreService;

  constructor(private httpClient: HttpClientService) {
    this.coreService = this.httpClient.create(microServiceNames.CORE);
  }

  async getAppBootstrap() {
    try {
      const appBootstrap = await this.coreService.get('/core/app/bootstrap');
      return appBootstrap;
    } catch (error) {
      throw new BadRequestException('bad request');
    }
  }
}
