import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isPositiveValidationOptions,
  isStringValidationOptions,
} from '../dto-validation';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
  @Type(() => Number)
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isPositiveValidationOptions())
  limit: number;

  @Type(() => Number)
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isPositiveValidationOptions())
  page: number;

  @IsOptional()
  @IsString(isStringValidationOptions())
  search: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    if (Array.isArray(value)) return value.map(String);
    return [];
  })
  relations?: string[];

  @IsOptional()
  @IsString(isStringValidationOptions())
  sort = 'name';

  @IsOptional()
  @IsString(isStringValidationOptions())
  order: 'ASC' | 'DESC' = 'ASC';
}
