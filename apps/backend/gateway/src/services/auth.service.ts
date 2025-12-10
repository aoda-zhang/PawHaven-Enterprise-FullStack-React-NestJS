import { Injectable } from '@nestjs/common';
import { HttpClientService, MicroServiceNames } from '@pawhaven/backend-core';

@Injectable()
export class AuthService {
  private readonly coreService;

  constructor(private httpClient: HttpClientService) {
    this.coreService = this.httpClient.create(MicroServiceNames.CORE);
  }

  test(id: string) {
    return this.coreService.get(`/pawhaven/${id}`);
  }
}
