import { PickType } from '@nestjs/swagger';
import { ProductDto } from './base-product.dto';

export class CreateProductDto extends PickType(ProductDto, [
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