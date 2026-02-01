import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateServiceDto, UpdateServiceDto } from '../dto/services';
import { ServiceEntity } from '@modules/core/entities';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class ServicesService {
  private paginateFilterService: PaginateFilterService<ServiceEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.SERVICE_REPOSITORY)
    private repository: Repository<ServiceEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateServiceDto): Promise<ServiceEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['name', 'description'],
      relations: ['branch', 'category'],
    });
  }

  async findOne(id: string): Promise<ServiceEntity> {
    const entity = await this.repository.findOne({ 
      where: { id },
      relations: ['branch', 'category'],
    });
    if (!entity) throw new NotFoundException(`Servicio no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateServiceDto): Promise<ServiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Servicio no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<ServiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Servicio no encontrado para eliminar');
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
