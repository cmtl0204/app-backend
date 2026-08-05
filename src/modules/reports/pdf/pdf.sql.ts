import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthRepositoryEnum } from '@utils/enums';

import { UserEntity } from '@auth/entities';

@Injectable()
export class PdfSql {
  constructor(
    @Inject(AuthRepositoryEnum.userRepository)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUsers(id:string): Promise<any> {
    const users = await this.userRepository.createQueryBuilder('users').getRawMany();

    return {
      users,
    };
  }
}
