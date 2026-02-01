import { PickType } from '@nestjs/swagger';
import { StaffWorkingHourDto } from './base-staff-working-hour.dto';
import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';
import { isStringValidationOptions } from '@utils/dto-validation';

export class UpdateStaffWorkingHourDto extends PickType(StaffWorkingHourDto, [
  'staffProfileId',
  'weekday',
  'startTime',
  'endTime',
  'breakStart',
  'breakEnd',
  'isDayOff',
  'enabled',
]) {
    @IsOptional()
  @IsInt()
  readonly weekday: number;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly startTime: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly endTime: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakStart?: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakEnd?: string;

  @IsOptional()
  @IsBoolean()
  readonly isDayOff: boolean;

  @IsOptional()
  readonly enabled: boolean;
}