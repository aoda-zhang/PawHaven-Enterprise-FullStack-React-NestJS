import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export default class TripInfoDTO {
  @ApiProperty({ description: 'Trip destination' })
  @IsNotEmpty({ message: 'Trip destination is required !' })
  @IsString()
  @Type(() => String)
  destination: string;

  @ApiProperty({ description: 'Trip date' })
  @IsNotEmpty({ message: 'Trip date is required !' })
  @IsString()
  @Type(() => String)
  date: string;

  @ApiProperty({ description: 'trip note' })
  @IsNotEmpty({ message: 'note is requied' })
  @IsString()
  @Type(() => String)
  note: string;
}
