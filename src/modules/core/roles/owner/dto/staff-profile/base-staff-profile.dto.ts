import { IsString, IsOptional, MaxLength, IsUUID, IsDecimal } from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';

export class StaffProfileDto {
  @IsUUID()
  readonly userId: string;

  @IsUUID()
  readonly positionId: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly photoUrl: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly displayName: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly specialty: string;

  @IsString(isStringValidationOptions())
  @MaxLength(50, maxLengthValidationOptions())
  readonly colorTag: string;

  @IsString(isStringValidationOptions())
  @MaxLength(50, maxLengthValidationOptions())
  readonly commissionType: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' }, isNumberValidationOptions())
  readonly commissionValue: number;

  @IsOptional()
  readonly enabled: boolean;
}
