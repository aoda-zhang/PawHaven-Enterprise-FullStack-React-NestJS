import { Controller } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Payload } from '@nestjs/microservices';
// import { Response } from 'express';

// import { PDFService } from './PDF.service';

@Controller('pdf')
export class PDFController {
  constructor() {
    // private readonly pdfService: PDFService,
    // private readonly configService: ConfigService,
  }

  // @MessagePattern(documentMessagePattern.GET_DOCUMENT_BY_ID)
  // generatePdf(@Payload() payload: any) {
  //   return this.pdfService.generatePDF(payload);
  // }

  // @Post('v1/preview')
  // async generatePDFPreview(@Body() payload: any, @Res() res: Response) {
  //   // Only for develop test
  //   if (this.configService.get('http.env') === 'prod') {
  //     throw new BadRequestException('Forbidden request!');
  //   }
  //   const PDFData = await this.pdfService.generatePDF(payload);
  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': `attachment; filename=${PDFData?.fileName}`,
  //   });
  //   res.end(PDFData?.data);
  // }
}
