import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '@modules/core/entities';
import { PaginateFilterService } from '@utils/pagination';
import { AuthRepositoryEnum, CoreRepositoryEnum } from '@utils/enums';
import { UserEntity } from '@auth/entities';

@Injectable()
export class AppointmentsService {
  private paginateFilterService: PaginateFilterService<AppointmentEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.APPOINTMENT_REPOSITORY)
    private repository: Repository<AppointmentEntity>,
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async verifyRegisteredUser(identification: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { identification },
    });
  }
}
