import { Injectable } from '@nestjs/common';
import { HttpClientService } from '@pawhaven/backend-core';

@Injectable()
export class AuthService {
  private readonly authService;

  constructor(private httpClient: HttpClientService) {
    this.authService = this.httpClient.create('user-service');
  }

  test(id: string) {
    return this.authService.get(`/pawhaven/${id}`);
  }
}
