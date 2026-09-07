import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { httpHeaders } from '@pawhaven/backend-core/constants';
import { readHeader } from '@pawhaven/backend-core/utils';
import type { BootstrapData } from '@pawhaven/shared/types';

import { MenuItemDto } from './DTO/menu.DTO';
import { BootstrapService } from './bootstrap.service';

@ApiTags('bootstrap')
@Controller('bootstrap')
export class BootstrapController {
  constructor(private readonly bootstrapService: BootstrapService) {}

  @Get()
  @ApiOperation({
    summary: 'Get application bootstrap data: menus and user permissions',
  })
  getBootstrapData(@Req() req: Request): Promise<BootstrapData> {
    const verifiedHeader = readHeader(req.headers, httpHeaders.authVerified);
    const userRolesHeader = readHeader(req.headers, httpHeaders.authUserRoles);
    const userRoles =
      this.bootstrapService.resolveRequestRoles(userRolesHeader);
    const isAuthenticated = verifiedHeader === '1';

    return this.bootstrapService.getBootstrapData(userRoles, isAuthenticated);
  }

  @Post('/menu')
  createMenu(@Body() menu: MenuItemDto): Promise<MenuItemDto> {
    return this.bootstrapService.addMenuItem(menu);
  }
}
