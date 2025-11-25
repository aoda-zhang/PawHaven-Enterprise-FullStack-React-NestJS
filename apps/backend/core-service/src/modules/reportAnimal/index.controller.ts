import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { ReportAnimalService } from './index.service';
import { CreateAnimalDto } from './DTO/create-animal.dto';

@Controller('reportAnimal')
export class ReportAnimalController {
  constructor(private readonly reportAnimalSerice: ReportAnimalService) {}

  @GrpcMethod('AnimalService', 'CreateAnimal')
  AddAnimal(data: CreateAnimalDto) {
    return this.reportAnimalSerice.addAnimal();
  }
}
