import { PickType } from '@nestjs/swagger';
import { CustomerDto } from './base-customer.dto';

export class CreateCustomerDto extends PickType(CustomerDto, [
  'referralId',
  'userId',
  'taxIdentification',
  'taxName',
  'allergies',
]) {}
