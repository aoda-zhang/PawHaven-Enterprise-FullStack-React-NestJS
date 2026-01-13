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
  createMenus(@Body() menu: any) {
    return this.bootService.createMenus(menu);
  }
}
