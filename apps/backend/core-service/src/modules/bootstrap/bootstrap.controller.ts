import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptionalAuth } from '@pawhaven/backend-core/decorators';
import { InternalJwt as InternalJwtParam } from '@pawhaven/backend-core/internal-jwt';
import {
  InternalJwtKind,
  type BootstrapData,
  type InternalJwt,
} from '@pawhaven/shared/types';

import { MenuItemDto } from './DTO/menu.DTO';
import { BootstrapService } from './bootstrap.service';

@ApiTags('bootstrap')
@Controller('bootstrap')
export class BootstrapController {
  constructor(private readonly bootstrapService: BootstrapService) {}

  @OptionalAuth()
  @Get()
  @ApiOperation({
    summary: 'Get application bootstrap data: menus and user permissions',
  })
  getBootstrapData(
    @InternalJwtParam({ allowAnonymous: true }) claims: InternalJwt,
  ): Promise<BootstrapData> {
    const isAuthenticated = claims.kind === InternalJwtKind.AUTHENTICATED;
    const userRoles = this.bootstrapService.resolveRoles(
      isAuthenticated ? claims.roles : undefined,
    );

    return this.bootstrapService.getBootstrapData(userRoles, isAuthenticated);
  }

  @Post('/menu')
  createMenu(@Body() menu: MenuItemDto): Promise<MenuItemDto> {
    return this.bootstrapService.addMenuItem(menu);
  }
}
