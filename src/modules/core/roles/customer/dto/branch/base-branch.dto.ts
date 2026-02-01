import { IsString, MaxLength } from 'class-validator';
import { isStringValidationOptions, maxLengthValidationOptions } from '@utils/dto-validation';

export class BaseBranchDto {
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly phone: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly email: string;

  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly address: string;

  @IsString(isStringValidationOptions())
  @MaxLength(100, maxLengthValidationOptions())
  readonly city: string;
}
