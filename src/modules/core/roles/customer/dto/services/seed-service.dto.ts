import { PickType } from '@nestjs/swagger';
import { ServiceDto } from './base-service.dto';

export class SeedServiceDto extends PickType(ServiceDto, [
  'branchId',
  'categoryId',
  'name',
  'description',
  'durationMin',
  'basePrice',
  'isEnabled',
]) {}
