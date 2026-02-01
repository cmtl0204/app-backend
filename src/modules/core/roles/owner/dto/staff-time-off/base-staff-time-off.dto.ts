import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';
import { isStringValidationOptions, isDateValidationOptions } from '@utils/dto-validation';

export class StaffTimeOffDto {
  @IsUUID()
  readonly staffProfileId: string;

  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @IsString(isStringValidationOptions())
  readonly reason: string;

  @IsOptional()
  readonly enabled: boolean;
}
