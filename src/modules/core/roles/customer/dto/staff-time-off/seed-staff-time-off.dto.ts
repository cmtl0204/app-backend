import { PickType } from '@nestjs/swagger';
import { StaffTimeOffDto } from './base-staff-time-off.dto';

export class SeedStaffTimeOffDto extends PickType(StaffTimeOffDto, [
  'staffProfileId',
  'startAt',
  'endAt',
  'reason',
  'enabled',
]) {}
