import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import type { Schema } from 'mongoose'

export default class UserInfoDTO {
    // 必选项描述
    @ApiProperty({ description: '用户姓名', default: '二狗' }) // 默认值设置
    @IsNotEmpty({ message: '姓名为必填项' })
    @IsString()
    @Type(() => String)
    @MinLength(2, { message: '姓名最小长度为2' })
    @MaxLength(10, { message: '姓名最大长度为10' })
    readonly userName: string

    @ApiProperty({ description: '用户ID' })
    userID: Schema.Types.ObjectId

    @ApiProperty({ description: '用户权限组' })
    @IsArray()
    readonly roles?: string[]
}
