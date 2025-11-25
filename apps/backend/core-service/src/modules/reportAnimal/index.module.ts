import { Module } from '@nestjs/common';

import { ReportAnimalController } from './index.controller';
import { ReportAnimalService } from './index.service';

@Module({
  controllers: [ReportAnimalController],
  providers: [ReportAnimalService],
  exports: [ReportAnimalService],
})
export class ReportAnimalModule {}
