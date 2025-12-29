import { Controller, Get } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { CoreService } from './services/core.service';

@Controller()
export class GatewayController {
  constructor(
    private readonly authService: AuthService,
    private readonly coreService: CoreService,
  ) {}

  // ---------core service------------ //

  @Get('/core/bootstrap')
  getNavigation() {
    return this.coreService.getAppBootstrap();
  }

  // ---------auth service------------ //

  @Get('/auth/navigation')
  getNavigations() {
    return this.authService.getNavigation();
  }
}
