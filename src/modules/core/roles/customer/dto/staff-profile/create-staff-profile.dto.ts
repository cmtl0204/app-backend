import { PickType } from '@nestjs/swagger';
import { StaffProfileDto } from './base-staff-profile.dto';

export class CreateStaffProfileDto extends PickType(StaffProfileDto, [
  'userId',
  'positionId',
  'photoUrl',
  'displayName',
  'specialty',
  'colorTag',
  'commissionType',
  'commissionValue',
  'enabled',
]) {}
