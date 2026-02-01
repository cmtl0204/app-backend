import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStaffWorkingHourDto, UpdateStaffWorkingHourDto } from '../dto/staff-working-hour';
import { StaffWorkingHourEntity } from '@modules/core/entities';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class StaffWorkingHourService {
  private paginateFilterService: PaginateFilterService<StaffWorkingHourEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.STAFF_WORKING_HOUR_REPOSITORY)
    private repository: Repository<StaffWorkingHourEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateStaffWorkingHourDto): Promise<StaffWorkingHourEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['weekday'],
      relations: ['staffProfile'],
    });
  }

  async findOne(id: string): Promise<StaffWorkingHourEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['staffProfile'],
    });
    if (!entity) throw new NotFoundException(`Horario de trabajo no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateStaffWorkingHourDto): Promise<StaffWorkingHourEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Horario de trabajo no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<StaffWorkingHourEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Horario de trabajo no encontrado para eliminar');
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
