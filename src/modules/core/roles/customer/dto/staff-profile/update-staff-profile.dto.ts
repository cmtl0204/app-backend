import { PickType } from '@nestjs/swagger';
import { StaffProfileDto } from './base-staff-profile.dto';
import { IsOptional, IsString, MaxLength, IsDecimal } from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';

export class UpdateStaffProfileDto extends PickType(StaffProfileDto, [
  'userId',
  'positionId',
  'photoUrl',
  'displayName',
  'specialty',
  'colorTag',
  'commissionType',
  'commissionValue',
  'enabled',
]) {
  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly photoUrl: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly displayName: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly specialty: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(50, maxLengthValidationOptions())
  readonly colorTag: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(50, maxLengthValidationOptions())
  readonly commissionType: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' }, isNumberValidationOptions())
  readonly commissionValue: number;

  @IsOptional()
  readonly enabled: boolean;
}
