import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { HomeData } from '@pawhaven/shared/types';

import { HomeService } from './home.service';

@ApiTags('home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get home content data: hero statistics, latest rescues and adoptable pets',
  })
  getHomeData(): Promise<HomeData> {
    return this.homeService.getHomeData();
  }
}
