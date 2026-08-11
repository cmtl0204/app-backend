import { Controller, Get, Header, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PdfService } from '@modules/reports/pdf/pdf.service';
import { PublicRoute } from '@auth/decorators';
import { Response } from 'express';

@ApiTags('Internal PDF Reports')
@Controller('reports/pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @PublicRoute()
  @Header('Content-Type', 'application/pdf')
  @Get('registration')
  async generateRegistration(@Res() response: Response, @Query('studentId') studentId: string) {
    const pdfDoc: PDFKit.PDFDocument = (await this.pdfService.generateRegistration({
      type: 'pdf',
      studentId: studentId,
    })) as PDFKit.PDFDocument;

    pdfDoc.info.Title = 'Registration Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
