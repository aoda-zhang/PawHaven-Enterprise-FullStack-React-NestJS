import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator'
import { IsString } from 'class-validator'
import EmailOptionsDTO from './email-options.DTO'

export default class EmailPayloadDTO {
    @ApiProperty({ description: 'Email template name' })
    @IsNotEmpty({ message: 'Template is requied' })
    @IsString()
    @Type(() => String)
    template: string

    @ApiProperty({ description: 'Email locale' })
    @IsNotEmpty({ message: 'Locale is requied' })
    @IsString()
    @Type(() => String)
    locale: string

    @ApiProperty({ description: 'Email data payload' })
    @IsNotEmpty({ message: 'Email payload is requied' })
    @IsObject()
    @Type(() => Object)
    payload: Record<string, any>

    @ApiProperty({ description: 'Email options like from, to, subject, etc.' })
    @IsNotEmpty({ message: 'Email options is requied' })
    @ValidateNested()
    @Type(() => EmailOptionsDTO)
    options: EmailOptionsDTO
}
