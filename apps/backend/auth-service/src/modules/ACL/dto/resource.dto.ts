import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { PermissionDTO } from './permission.dto';

export class ResourceDTO {
  @ApiProperty({ description: '资源名称', required: true })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @MaxLength(50, { message: '资源名称最多为50' })
  name: string | undefined;

  @ApiProperty({ description: '资源描述' })
  @IsOptional()
  @MaxLength(500, { message: '资源描述最多为500' })
  desc?: string;

  @ApiProperty({ description: '权限列表', required: true })
  @ValidateNested({ each: true })
  @IsArray()
  @IsDefined()
  @Type(() => PermissionDTO)
  permissions: PermissionDTO[] | undefined;
}
