// appointment-services.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentServiceEntity } from '@modules/core/entities';
import { CreateAppointmentServiceDto, UpdateAppointmentServiceDto } from '../dto/appointment-service';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class AppointmentServicesService {
  private paginateFilterService: PaginateFilterService<AppointmentServiceEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.APPOINTMENT_SERVICE_REPOSITORY)
    private repository: Repository<AppointmentServiceEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateAppointmentServiceDto): Promise<AppointmentServiceEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: [],
      relations: ['appointment', 'service'],
    });
  }

  async findOne(id: string): Promise<AppointmentServiceEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['appointment', 'service'],
    });
    if (!entity) throw new NotFoundException(`Servicio de cita no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateAppointmentServiceDto): Promise<AppointmentServiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Servicio de cita no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<AppointmentServiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Servicio de cita no encontrado para eliminar');
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