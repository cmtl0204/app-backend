import { PickType } from '@nestjs/swagger';
import { CustomerDto } from './base-customer.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { isStringValidationOptions, maxLengthValidationOptions } from '@utils/dto-validation';

export class UpdateCustomerDto extends PickType(CustomerDto, [
  'referralId',
  'taxIdentification',
  'taxName',
  'allergies',
]) {
  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly taxName: string;
}
