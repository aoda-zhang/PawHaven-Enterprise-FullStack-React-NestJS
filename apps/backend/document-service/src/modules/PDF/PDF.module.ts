import { Module } from '@nestjs/common';

import { PDFController } from './PDF.controller';
import { PDFService } from './PDF.service';

@Module({
  controllers: [PDFController],
  providers: [PDFService],
  exports: [PDFService],
})
export class PDFModule { }
