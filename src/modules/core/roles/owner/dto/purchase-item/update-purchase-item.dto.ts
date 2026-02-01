import { PickType } from '@nestjs/swagger';
import { PurchaseItemDto } from './base-purchase-item.dto';

export class UpdatePurchaseItemDto extends PickType(PurchaseItemDto, [
  'purchaseId',
  'productId',
  'quantity',
  'unitCost',
  'total',
]) {}