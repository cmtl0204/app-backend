import { IsNotEmpty, IsString, IsUUID, IsDecimal, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';

export class InventoryMovementDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'El producto debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly productId: string;

  @IsUUID('4', { message: 'La ubicación debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly locationId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string;

  @IsUUID('4', { message: 'El modelo debe ser un UUID válido' })
  @IsOptional()
  readonly modelId?: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly type: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly reason?: string;

  @IsDecimal({}, { message: 'La cantidad debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}