import { IsNotEmpty, IsString, IsUUID, IsDecimal, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';

export class InvoiceItemDto {
  @IsUUID('4', { message: 'La factura debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceId: string;

  @IsUUID('4', { message: 'El personal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string;

  @IsUUID('4', { message: 'El modelo debe ser un UUID válido' })
  @IsOptional()
  readonly modelId?: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly description: string;

  @IsDecimal({}, { message: 'La cantidad debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;

  @IsDecimal({}, { message: 'El precio unitario debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unitPrice: number;

  @IsDecimal({}, { message: 'El descuento debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly discount: number;

  @IsDecimal({}, { message: 'El impuesto debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @IsDecimal({}, { message: 'El total debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}