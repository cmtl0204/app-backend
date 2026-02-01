import { IsUUID, IsInt, IsBoolean, IsOptional, IsString } from 'class-validator';
import { isStringValidationOptions } from '@utils/dto-validation';

export class StaffWorkingHourDto {
  @IsUUID()
  readonly staffProfileId: string;

  @IsInt()
  readonly weekday: number;

  @IsString(isStringValidationOptions())
  readonly startTime: string;

  @IsString(isStringValidationOptions())
  readonly endTime: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakStart?: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakEnd?: string;

  @IsBoolean()
  readonly isDayOff: boolean;

  @IsOptional()
  readonly enabled: boolean;
}
