import { PickType } from '@nestjs/swagger';
import { AppointmentServiceDto } from './base-appointment-service.dto';

export class CreateAppointmentServiceDto extends PickType(AppointmentServiceDto, [
  'appointment',
  'serviceId',
  'durationMin',
  'price',
]) {}
