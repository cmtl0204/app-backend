import { IsDecimal, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { isNotEmptyValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';
import { AppointmentEntity } from '@modules/core/entities';

export class AppointmentServiceDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly appointment: AppointmentEntity;

  @IsUUID('4', { message: 'El servicio debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly serviceId: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  readonly durationMin: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDecimal({}, { message: 'El precio debe ser un número decimal válido' })
  readonly price: number;
}
