import { Controller, Get } from '@nestjs/common';
// import { GrpcMethod } from '@nestjs/microservices';

import { ReportAnimalService } from './index.service';

@Controller()
export class ReportAnimalController {
  constructor(private readonly reportAnimalSerice: ReportAnimalService) {}

  // @GrpcMethod('AnimalService', 'CreateAnimal')
  @Get('/test/:id')
  AddAnimal() {
    return this.reportAnimalSerice.addAnimal();
  }
}
