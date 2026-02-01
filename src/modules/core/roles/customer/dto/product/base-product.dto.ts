import { IsNotEmpty, IsString, IsUUID, IsBoolean, IsDecimal, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isBooleanValidationOptions,
} from '@utils/dto-validation';

export class ProductDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'La categoría debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly categoryId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly sku: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly description?: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unit: string;

  @IsDecimal({}, { message: 'El costo debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly costPrice: number;

  @IsDecimal({}, { message: 'El precio de venta debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly salePrice: number;

  @IsBoolean(isBooleanValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly trackStock: boolean;

  @IsBoolean(isBooleanValidationOptions())
  @IsOptional()
  readonly enabled?: boolean;
}