import { Controller, Get } from '@nestjs/common';
// import { GrpcMethod } from '@nestjs/microservices';

import { ReportAnimalService } from './index.service';
import { CreateAnimalDto } from './DTO/create-animal.dto';

@Controller('/api')
export class ReportAnimalController {
  constructor(private readonly reportAnimalSerice: ReportAnimalService) { }

  // @GrpcMethod('AnimalService', 'CreateAnimal')
  @Get('/pawhaven/:id')
  AddAnimal(data: CreateAnimalDto) {
    return this.reportAnimalSerice.addAnimal();
  }
}
