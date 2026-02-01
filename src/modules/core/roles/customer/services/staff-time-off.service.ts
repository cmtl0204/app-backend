import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStaffTimeOffDto, UpdateStaffTimeOffDto } from '../dto/staff-time-off';
import { StaffTimeOffEntity } from '@modules/core/entities';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class StaffTimeOffService {
  private paginateFilterService: PaginateFilterService<StaffTimeOffEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.STAFF_TIME_OFF_REPOSITORY)
    private repository: Repository<StaffTimeOffEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateStaffTimeOffDto): Promise<StaffTimeOffEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['reason'],
      relations: ['staffProfile'],
    });
  }

  async findOne(id: string): Promise<StaffTimeOffEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['staffProfile'],
    });
    if (!entity) throw new NotFoundException(`Tiempo libre no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateStaffTimeOffDto): Promise<StaffTimeOffEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Tiempo libre no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<StaffTimeOffEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Tiempo libre no encontrado para eliminar');
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
