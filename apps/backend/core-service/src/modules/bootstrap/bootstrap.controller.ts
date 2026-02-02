import { Body, Controller, Get, Post } from '@nestjs/common';

import { BootstrapService } from './bootstrap.service';

@Controller('/app')
export class BootstrapController {
  constructor(private readonly bootService: BootstrapService) {}

  @Get('/bootstrap')
  getAppBootstrap() {
    return this.bootService.getAppBootstrap();
  }

  @Post('/menu')
  createMenu(@Body() menu: any) {
    return this.bootService.addMenuItem(menu);
  }

  @Post('/router')
  createRouter(@Body() router: any) {
    return this.bootService.addAppRouter(router);
  }
}
