// suppliers.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SupplierEntity } from '@modules/core/entities';
import { CreateSupplierDto, UpdateSupplierDto } from '../dto/supplier';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class SuppliersService {
  private paginateFilterService: PaginateFilterService<SupplierEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.SUPPLIER_REPOSITORY)
    private repository: Repository<SupplierEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateSupplierDto): Promise<SupplierEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['name', 'email', 'phone', 'identification'],
      relations: ['branch'],
    });
  }

  async findOne(id: string): Promise<SupplierEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch'],
    });
    if (!entity) throw new NotFoundException(`Proveedor no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateSupplierDto): Promise<SupplierEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Proveedor no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<SupplierEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Proveedor no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      take: 1000,
      relations: ['branch'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}