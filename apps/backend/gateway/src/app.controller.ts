import { Controller, Get, Param } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { CoreService } from './services/core.service';

@Controller()
export class GatewayController {
  constructor(
    private readonly authService: AuthService,
    private readonly coreService: CoreService,
  ) {}

  // ---------core service------------ //

  @Get('/core/test/:id')
  testCore(@Param('id') id: string) {
    return this.coreService.test(id);
  }

  // ---------auth service------------ //

  @Get('/auth/test/:id')
  testAuth(@Param('id') id: string) {
    return this.authService.test(id);
  }
}
