import { PickType } from '@nestjs/swagger';
import { BaseBranchDto } from './base-branch.dto';

export class UpdateBranchDto extends PickType(BaseBranchDto, [
  'name',
  'phone',
  'email',
  'address',
  'city',
]) {}
