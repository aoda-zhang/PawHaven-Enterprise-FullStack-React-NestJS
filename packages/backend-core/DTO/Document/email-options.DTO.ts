import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator'
import { IsString } from 'class-validator'

// More options can refer to  ISendMailOptions from '@nestjs-modules/mailer'
export default class EmailOptionsDTO {
    @ApiProperty({ description: 'Email to' })
    @IsNotEmpty({ message: 'To is required' })
    @IsString({ each: true })
    @Type(() => String)
    to: string | string[]

    @ApiProperty({ description: 'Email subject' })
    @IsString()
    @Type(() => String)
    subject: string

    @ApiPropertyOptional({ description: 'Email cc' })
    @IsOptional()
    @IsString()
    @Type(() => String)
    cc?: string | string[]

    @ApiPropertyOptional({ description: 'Email bcc' })
    @IsOptional()
    @IsString()
    @Type(() => String)
    bcc?: string | string[]

    @ApiPropertyOptional({ description: 'Email attachments' })
    @IsOptional()
    @IsArray()
    @Type(() => Array)
    attachments?: any[]
}
