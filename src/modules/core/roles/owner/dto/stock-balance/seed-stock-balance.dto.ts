import { PickType } from '@nestjs/swagger';
import { StockBalanceDto } from './base-stock-balance.dto';

export class SeedStockBalanceDto extends PickType(StockBalanceDto, [
  'productId',
  'locationId',
  'quantity',
]) {}