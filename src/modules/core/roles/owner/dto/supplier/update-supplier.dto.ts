import { PickType } from '@nestjs/swagger';
import { SupplierDto } from './base-supplier.dto';

export class UpdateSupplierDto extends PickType(SupplierDto, [
  'branchId',
  'name',
  'phone',
  'email',
  'identification',
  'address',
]) {}