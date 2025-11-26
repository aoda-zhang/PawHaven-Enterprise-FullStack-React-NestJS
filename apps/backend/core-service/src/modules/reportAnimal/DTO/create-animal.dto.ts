import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name!: string;

  @IsString()
  species!: string;

  @IsInt()
  age!: number;

  @IsString()
  gender!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
