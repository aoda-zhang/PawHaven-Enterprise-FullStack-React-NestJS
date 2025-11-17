import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'
import { PDFOptions } from 'puppeteer'

export default class CreatePDFDTO {
    @ApiProperty({ description: 'PDF template name' })
    @IsNotEmpty({ message: 'Template is requied' })
    @IsString()
    @Type(() => String)
    template: string

    @ApiPropertyOptional({ description: 'Locale for generate PDF file' })
    @Type(() => String)
    locale?: string

    @ApiPropertyOptional({ description: 'PDF header data for generate PDF file' })
    @IsOptional()
    @IsObject()
    PDFHeaderData?: Record<string, any>

    @ApiPropertyOptional({ description: 'PDF data for generate PDF file' })
    @IsNotEmpty({ message: 'PDF content data is required' })
    @IsObject()
    PDFContentData: Record<string, any>

    @ApiPropertyOptional({ description: 'PDF footer data for generate PDF file' })
    @IsOptional()
    @IsObject()
    PDFFooterData?: Record<string, any>

    @ApiPropertyOptional({ description: 'PDF config for generate PDF file' })
    @IsOptional()
    @IsObject()
    PDFOptions?: PDFOptions
}
