import { PickType } from '@nestjs/swagger';
import { InvoiceItemDto } from './base-invoice-item.dto';

export class CreateInvoiceItemDto extends PickType(InvoiceItemDto, [
  'invoiceId',
  'staffId',
  'modelType',
  'modelId',
  'description',
  'quantity',
  'unitPrice',
  'discount',
  'tax',
  'total',
]) {}