import {
  IsString,
  IsOptional,
  MaxLength,
  IsUUID,
  IsInt,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isBooleanValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';

export class ServiceDto {
  @IsUUID()
  readonly branchId: string;

  @IsUUID()
  readonly categoryId: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsInt()
  readonly durationMin: number;

  @IsNumber({ maxDecimalPlaces: 2 }, isNumberValidationOptions())
  readonly basePrice: number;

  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly isEnabled: boolean;
}
