import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStaffProfileDto, UpdateStaffProfileDto } from '../dto/staff-profile';
import { StaffProfileEntity } from '@modules/core/entities';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class StaffProfilesService {
  private paginateFilterService: PaginateFilterService<StaffProfileEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.STAFF_PROFILE_REPOSITORY)
    private repository: Repository<StaffProfileEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateStaffProfileDto): Promise<StaffProfileEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['displayName', 'specialty'],
      relations: ['user', 'position'],
    });
  }

  async findOne(id: string): Promise<StaffProfileEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['user', 'position'],
    });
    if (!entity) throw new NotFoundException(`Perfil de staff no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateStaffProfileDto): Promise<StaffProfileEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Perfil de staff no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<StaffProfileEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Perfil de staff no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ take: 1000 });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}
