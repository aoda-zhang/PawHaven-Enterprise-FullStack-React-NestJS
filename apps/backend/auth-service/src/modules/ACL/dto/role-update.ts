import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class RoleUpdateDTO {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty({ description: '角色权限列表' })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => String)
  permissions: string[];
}
