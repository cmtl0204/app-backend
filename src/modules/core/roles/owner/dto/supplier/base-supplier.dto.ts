import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';

export class SupplierDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly phone?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly email?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly identification?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly address?: string;
}