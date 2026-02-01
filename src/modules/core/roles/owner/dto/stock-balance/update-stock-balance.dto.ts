import { PickType } from '@nestjs/swagger';
import { StockBalanceDto } from './base-stock-balance.dto';

export class UpdateStockBalanceDto extends PickType(StockBalanceDto, [
  'productId',
  'locationId',
  'quantity',
]) {}