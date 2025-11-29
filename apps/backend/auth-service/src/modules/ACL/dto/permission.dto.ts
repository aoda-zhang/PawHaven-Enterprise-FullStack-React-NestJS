import { ResourceType } from '@modules/permission.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PermissionDTO {
  @ApiProperty({ description: '权限分类', required: true })
  @IsNotEmpty()
  @IsEnum(ResourceType, { message: '无效的权限分类' })
  type!: ResourceType;

  @ApiProperty({ description: '权限名称', required: true })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @MaxLength(50, { message: '权限名称最多为50' })
  name!: string;

  @ApiProperty({ description: '权限描述', required: true })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @MaxLength(200, { message: '权限描述最多为200' })
  desc: string;
}
