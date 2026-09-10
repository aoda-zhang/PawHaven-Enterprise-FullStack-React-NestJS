import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InternalJwt } from '@pawhaven/backend-core/decorators';
import type {
  AnimalReportDto,
  AuthenticatedInternalJwt,
} from '@pawhaven/shared/types';

import { ReportAnimalService } from './report-animal.service';
import { CreateReportAnimalDto } from './DTO/report-animal.DTO';

@ApiTags('report-animal')
@Controller('report-animal')
export class ReportAnimalController {
  constructor(private readonly reportAnimalService: ReportAnimalService) {}

  @Post()
  @ApiOperation({ summary: 'Submit an animal report' })
  create(
    @Body() dto: CreateReportAnimalDto,
    @InternalJwt() claims: AuthenticatedInternalJwt,
  ) {
    return this.reportAnimalService.create(
      dto as unknown as AnimalReportDto,
      claims,
    );
  }
}
