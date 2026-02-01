import { PickType } from '@nestjs/swagger';
import { ProductDto } from './base-product.dto';

export class SeedProductDto extends PickType(ProductDto, [
  'branchId',
  'categoryId',
  'sku',
  'name',
  'description',
  'unit',
  'costPrice',
  'salePrice',
  'trackStock',
  'enabled',
]) {}