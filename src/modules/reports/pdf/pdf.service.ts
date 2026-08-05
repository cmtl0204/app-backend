import { Inject, Injectable } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { ConfigType } from '@nestjs/config';
import { envConfig } from '@config';
import { PdfSql } from '@modules/reports/pdf/pdf.sql';
import { registrationCertificateGuideReport } from '@modules/reports/pdf/templates/registration-certificate-guide.report';

@Injectable()
export class PdfService {
  constructor(
    private readonly pdfSql: PdfSql,
    private readonly printerService: PrinterService,
    @Inject(envConfig.KEY) private configService: ConfigType<typeof envConfig>,
  ) {}

  async generateInactivation({
    type = 'buffer',
    id,
  }: {
    type?: string;
    id: string;
  }): Promise<PDFKit.PDFDocument | Buffer> {
    const data: any = await this.pdfSql.findUsers(id);

    try {
      if (type === 'buffer')
        return this.printerService.createPdfBuffer(registrationCertificateGuideReport(data));
      else return this.printerService.createPdf(registrationCertificateGuideReport(data));
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
