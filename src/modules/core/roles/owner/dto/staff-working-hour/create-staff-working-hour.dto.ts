import { PickType } from '@nestjs/swagger';
import { StaffWorkingHourDto } from './base-staff-working-hour.dto';

export class CreateStaffWorkingHourDto extends PickType(StaffWorkingHourDto, [
  'staffProfileId',
  'weekday',
  'startTime',
  'endTime',
  'breakStart',
  'breakEnd',
  'isDayOff',
  'enabled',
]) {}
