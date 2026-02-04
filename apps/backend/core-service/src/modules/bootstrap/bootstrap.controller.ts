import { Body, Controller, Get, Post } from '@nestjs/common';

import { BootstrapService } from './bootstrap.service';
import { MenuItemDto } from './DTO/menu.DTO';

@Controller('/app')
export class BootstrapController {
  constructor(private readonly bootService: BootstrapService) {}

  @Get('/bootstrap')
  getAppBootstrap() {
    return this.bootService.getAppBootstrap();
  }

  @Post('/menu')
  createMenu(@Body() menu: MenuItemDto): Promise<MenuItemDto> {
    return this.bootService.addMenuItem(menu);
  }

  @Post('/router')
  createRouter(@Body() router: any) {
    return this.bootService.addAppRouter(router);
  }
}
