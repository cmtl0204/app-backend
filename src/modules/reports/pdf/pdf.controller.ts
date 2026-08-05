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
  @Get('inactivation')
  async generateInactivation(
    @Res() response: Response,
    @Query('cadastreId', ParseUUIDPipe) cadastreId: string,
  ) {
    const pdfDoc: PDFKit.PDFDocument = (await this.pdfService.generateInactivation({
      type: 'pdf',
      id: cadastreId,
    })) as PDFKit.PDFDocument;

    pdfDoc.info.Title = 'Users Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
