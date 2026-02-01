import { IsNotEmpty, IsString, IsUUID, IsDecimal, IsDate } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class PurchaseDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'El proveedor debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly supplierId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly documentNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly purchasedAt: Date;

  @IsDecimal({}, { message: 'El subtotal debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subtotal: number;

  @IsDecimal({}, { message: 'El impuesto debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @IsDecimal({}, { message: 'El total debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}