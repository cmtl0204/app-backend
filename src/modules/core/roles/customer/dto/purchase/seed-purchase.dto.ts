import { PickType } from '@nestjs/swagger';
import { PurchaseDto } from './base-purchase.dto';

export class SeedPurchaseDto extends PickType(PurchaseDto, [
  'branchId',
  'supplierId',
  'documentNumber',
  'purchasedAt',
  'subtotal',
  'tax',
  'total',
]) {}