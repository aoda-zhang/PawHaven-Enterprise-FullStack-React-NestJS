import { Controller, Get, Post } from '@nestjs/common';

import { BootstrapService } from './bootstrap.service';

@Controller('/app')
export class BootstrapController {
  constructor(private readonly bootService: BootstrapService) {}

  @Get('/bootstrap')
  getAppBootstrap() {
    return this.bootService.getAppBootstrap();
  }

  @Post('/create')
  createTest() {
    return this.bootService.create();
  }
}
