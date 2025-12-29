import { BootstrapModule } from '@modules/bootstrap/bootstrap.module';
import { ReportAnimalModule } from '@modules/reportAnimal/index.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ReportAnimalModule, BootstrapModule],
})
export class AppModule {}
