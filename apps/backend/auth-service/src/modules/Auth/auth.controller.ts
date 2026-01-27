import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/verify')
  verify() {
    return this.authService.verify();
  }
}
