import { Injectable } from '@nestjs/common';
import { HttpClientService, microServiceNames } from '@pawhaven/backend-core';

@Injectable()
export class AuthService {
  private readonly authService;

  constructor(private httpClient: HttpClientService) {
    this.authService = this.httpClient.create(microServiceNames.AUTH);
  }

  getNavigation() {
    return this.authService.get('/test');
  }
}
