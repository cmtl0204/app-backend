import { PickType } from '@nestjs/swagger';
import { InventoryMovementDto } from './base-inventory-movement.dto';

export class SeedInventoryMovementDto extends PickType(InventoryMovementDto, [
  'branchId',
  'productId',
  'locationId',
  'modelType',
  'modelId',
  'type',
  'reason',
  'quantity',
]) {}