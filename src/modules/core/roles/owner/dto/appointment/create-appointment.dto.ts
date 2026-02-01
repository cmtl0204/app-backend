import { PickType } from '@nestjs/swagger';
import { AppointmentDto } from './base-appointment.dto';

export class CreateAppointmentDto extends PickType(AppointmentDto, [
  'branch',
  'customerId',
  'staffProfileId',
  'statusId',
  'sourceId',
  'startAt',
  'endAt',
  'notes',
]) {}
