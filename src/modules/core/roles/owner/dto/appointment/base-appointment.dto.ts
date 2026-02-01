import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity } from '@modules/core/entities';

export class AppointmentDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsOptional()
  @IsUUID()
  readonly customerId: string;

  @IsOptional()
  @IsUUID()
  readonly staffProfileId: string;

  @IsOptional()
  readonly statusId: number;

  @IsOptional()
  readonly sourceId: number;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly notes: string;
}
