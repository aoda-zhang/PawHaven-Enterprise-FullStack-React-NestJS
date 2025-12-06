import { Controller, Get, Param } from '@nestjs/common';

import { AuthService } from './services/auth.service';

@Controller('/api')
export class GatewayController {
  constructor(private readonly authService: AuthService) {}

  @Get('/pawhaven/:id')
  getAnimal(@Param('id') id: string) {
    console.log(id);
    return this.authService.test(id);
  }
}
