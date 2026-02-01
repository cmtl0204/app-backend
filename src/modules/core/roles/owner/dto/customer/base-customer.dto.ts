import { IsString, IsOptional, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { CustomerEntity } from '@modules/core/entities';

export class CustomerDto {
  @IsOptional()
  @IsUUID()
  readonly referralId: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsUUID()
  readonly userId: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly taxIdentification: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly taxName: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly allergies: string;
}
