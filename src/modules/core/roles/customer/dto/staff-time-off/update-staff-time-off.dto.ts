import { PickType } from '@nestjs/swagger';
import { StaffTimeOffDto } from './base-staff-time-off.dto';
import { IsOptional, IsString, IsDate } from 'class-validator';
import { isStringValidationOptions, isDateValidationOptions } from '@utils/dto-validation';

export class UpdateStaffTimeOffDto extends PickType(StaffTimeOffDto, [
  'staffProfileId',
  'startAt',
  'endAt',
  'reason',
  'enabled',
]) {
  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly reason: string;

  @IsOptional()
  readonly enabled: boolean;
}
