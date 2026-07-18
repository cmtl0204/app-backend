import { IsOptional, IsPositive, IsString } from 'class-validator';
import { isPositiveValidationOptions, isStringValidationOptions } from '../dto-validation';
import { Type } from 'class-transformer';

export class PaginationDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive(isPositiveValidationOptions())
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive(isPositiveValidationOptions())
  page: number;

  @IsOptional()
  @IsString(isStringValidationOptions())
  search: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  sort: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  order: 'ASC' | 'DESC' = 'ASC';
}
