import { PickType } from '@nestjs/swagger';
import { ServiceDto } from './base-service.dto';

export class CreateServiceDto extends PickType(ServiceDto, [
  'branchId',
  'categoryId',
  'name',
  'description',
  'durationMin',
  'basePrice',
  'isEnabled',
]) {}
