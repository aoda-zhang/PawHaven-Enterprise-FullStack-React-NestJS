import { Injectable } from '@nestjs/common';
import { HttpClientService, microServiceNames } from '@pawhaven/backend-core';

@Injectable()
export class CoreService {
  private readonly coreService;

  constructor(private httpClient: HttpClientService) {
    this.coreService = this.httpClient.create(microServiceNames.CORE);
  }

  test(id: string) {
    return this.coreService.get(`/core/test/${id}`);
  }
}
