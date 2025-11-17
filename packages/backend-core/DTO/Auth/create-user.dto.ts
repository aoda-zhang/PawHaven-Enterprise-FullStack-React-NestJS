import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDTO {
  // 必选项描述
  @ApiProperty({ description: '用户姓名', default: '二狗' }) // 默认值设置
  @IsNotEmpty({ message: '姓名为必填项' })
  @IsString()
  @Type(() => String)
  @MinLength(2, { message: '姓名最小长度为2' })
  @MaxLength(10, { message: '姓名最大长度为10' })
  readonly userName: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码为必填项' })
  @IsString()
  @Type(() => String)
  readonly password: string;
}
