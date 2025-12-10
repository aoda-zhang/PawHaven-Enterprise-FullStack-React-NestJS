import { ReportAnimalModule } from '@modules/reportAnimal/index.module';
import { ReportAnimalService } from '@modules/reportAnimal/index.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ReportAnimalModule],
  providers: [ReportAnimalService],
  exports: [ReportAnimalService],
})
export class AppModule {}
