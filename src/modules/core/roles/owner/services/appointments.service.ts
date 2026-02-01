import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '@modules/core/entities';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto/appointment';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class AppointmentsService {
  private paginateFilterService: PaginateFilterService<AppointmentEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.APPOINTMENT_REPOSITORY)
    private repository: Repository<AppointmentEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateAppointmentDto): Promise<AppointmentEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['notes'],
      relations: ['branch', 'customer', 'staffProfile', 'status', 'source'],
    });
  }

  async findOne(id: string): Promise<AppointmentEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch', 'customer', 'staffProfile', 'status', 'source'],
    });
    if (!entity) throw new NotFoundException(`Cita no encontrada (find one)`);
    return entity;
  }

  async update(id: string, payload: UpdateAppointmentDto): Promise<AppointmentEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Cita no encontrada para actualizar`);
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<AppointmentEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Cita no encontrada para eliminar`);
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
