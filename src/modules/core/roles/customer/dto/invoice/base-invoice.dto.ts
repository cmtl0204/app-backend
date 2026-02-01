import { IsNotEmpty, IsString, IsUUID, IsDecimal, IsNumber, IsOptional, IsDate } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';

// base-invoice.dto.ts (CORREGIDO)
export class InvoiceDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'El cliente debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly customerId: string;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly statusId: number;

  // CORRECCIÓN: Cambiar createdBy por createdById
  @IsUUID('4', { message: 'El usuario creador debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly createdById: string;  // ← Cambiado de createdBy a createdById

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly issuedAt: Date;

  @IsDecimal({}, { message: 'El subtotal debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subtotal: number;

  @IsDecimal({}, { message: 'El descuento debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly discount: number;

  @IsDecimal({}, { message: 'El impuesto debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @IsDecimal({}, { message: 'El total debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly notes?: string;
}