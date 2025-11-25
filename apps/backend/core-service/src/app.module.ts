import { ReportAnimalModule } from '@modules/reportAnimal/index.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ReportAnimalModule],
  providers: [],
})
export class AppModule {}
