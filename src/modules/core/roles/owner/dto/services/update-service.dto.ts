import { PickType } from '@nestjs/swagger';
import { ServiceDto } from './base-service.dto';
import { IsOptional, IsString, MaxLength, IsInt, IsNumber, IsBoolean } from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
  isBooleanValidationOptions,
} from '@utils/dto-validation';

export class UpdateServiceDto extends PickType(ServiceDto, [
  'branchId',
  'categoryId',
  'name',
  'description',
  'durationMin',
  'basePrice',
  'isEnabled',
]) {
  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsOptional()
  @IsInt()
  readonly durationMin: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, isNumberValidationOptions())
  readonly basePrice: number;

  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly isEnabled: boolean;
}
